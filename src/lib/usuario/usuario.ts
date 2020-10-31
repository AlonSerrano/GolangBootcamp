import { HttpErrors } from '@loopback/rest';
import { TokenService, UserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { UserProfile } from "@loopback/security";
import { PasswordHasherBindings, ServiceBindings, TokenServiceBindings } from '../../keys';
import { PasswordHasher, validateCredentials, newStringDate, OTPService, MessageBird_Service, IPINFOService } from '../../services';
import { UserRepository, Credentials, RolUsuarioRepository, RolRepository } from '../../repositories';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

export class UsuarioLib {
    constructor(
        // ...
        @repository(UserRepository) public userRepository: UserRepository,
        @repository(RolUsuarioRepository) public roleuserRepository: RolUsuarioRepository,
        @repository(RolRepository) public roleRepository: RolRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(ServiceBindings.OTP_Service)
        public otpService: OTPService,
        @inject(ServiceBindings.BIRD_Service)
        public messageBirdService: MessageBird_Service,
        @inject(ServiceBindings.USER_SERVICE)
        public userService: UserService<UsuarioLib, Credentials>,
        @inject(ServiceBindings.IPINFO_Service)
        public ipinfo: IPINFOService,

    ) { }

    async signIn(req: any, credentials: Credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const browser = req.headers['user-agent'];
        let lookUp = await this.ipinfo.lookUpIP(ip);

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);

        return { token };
    }

    async signUp(newUserRequest: any) {
        validateCredentials(_.pick(newUserRequest, ['email', 'celular', 'password']));
        if (await this.otpService.validOTP("Registro", newUserRequest.codigo, "", newUserRequest.celular)) {
            // encrypt the password
            const password = await this.passwordHasher.hashPassword(
                newUserRequest.password,
            );
            let passBefore = newUserRequest.password;

            const invalidCredentialsError = 'Lo sentimos el correo ya se encuentra registrado.';
            const foundUser = await this.userRepository.findOne({
                where: { celular: newUserRequest.celular, email: newUserRequest.email },
            });
            if (foundUser) {
                throw new HttpErrors.Unauthorized(invalidCredentialsError);
            }
            newUserRequest.id = uuid();
            newUserRequest.creado = newStringDate();
            newUserRequest.actualizado = newStringDate();
            newUserRequest.password = password;
            try {
                // create the new user
                delete newUserRequest.codigo;
                newUserRequest.celularValid = true;
                const savedUser = await this.userRepository.create(
                    newUserRequest,
                );
                const roleData = { id: uuid(), idUsuario: savedUser.id, idRol: "CONSUMIDOR", creado: newStringDate(), actualizado: newStringDate() }
                const savedRol = await this.roleuserRepository.create(
                    roleData,
                );
                return { "message": "Usuario registrado con exito" };
            } catch (error) {
                if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                    throw new HttpErrors.Conflict('Email value is already taken');
                } else {
                    throw error;
                }
            }
        } else {
            throw new HttpErrors.NotFound('Codigo de confirmación invalido');
        }
    }
    async requireSignUp(email: any, celular: any) {
        let response: any;
        validateCredentials({ email: email, celular: celular, password: "" });
        await this.otpService.validateSendOTP("Registro", email, celular)
        let otp = await this.otpService.createOTP("Registro", celular, email);
        if (email) {
            //response = await this.messageBirdService.sendMessage(otp);
        }
        if (celular) {
            response = await this.messageBirdService.sendMessage(otp);
        }
        return response;
    }

    async agregarRol(user: UserProfile, rol: any) {
        let response: any;
        let roles = await this.roleRepository.find();
        let roleExist = roles.filter(x => { return x.id == rol })
        if (roleExist.length > 0) {
            let currentUser = await this.userRepository.findById(user.id, { include: [{ relation: 'roles' }] });
            console.log(currentUser);
            let hasRol = currentUser.roles?.filter(x => { return x.idRol == rol })
            if (hasRol && hasRol.length >= 1) {
                throw new HttpErrors.NotFound('El usuario ya tiene asignado el rol');
            }
            //TODO Validar roles administrativos
            const roleData = { id: uuid(), idUsuario: currentUser.id, idRol: rol, creado: newStringDate(), actualizado: newStringDate() }
            const savedRol = await this.roleuserRepository.create(
                roleData,
            );
            let roleUser = await this.userRepository.findById(user.id, { include: [{ relation: 'roles' }] });
            user.roles = roleUser.roles?.map(x => x.idRol)
            // create a JSON Web Token based on the user profile
            const token = await this.jwtService.generateToken(user);
            return { token };

        } else {
            throw new HttpErrors.NotFound('El rol proporcionado no existe');
        }
    }

    async requireChangePassword(email: any, celular: any) {
        let response: any;
        validateCredentials({ email: email, celular: celular, password: "" });
        await this.otpService.validateSendOTP("Cambio contraseña", email, celular)
        let otp = await this.otpService.createOTP("Cambio contraseña", celular, email);
        if (email) {
            //response = await this.messageBirdService.sendMessage(otp);
        }
        if (celular) {
            response = await this.messageBirdService.sendMessage(otp);
        }
        return response;
    }

    async changePassword(changePassword: any) {
        let response: any;
        validateCredentials({ email: changePassword.email, celular: changePassword.celular, password: "" });
        if (await this.otpService.validOTP("Cambio contraseña", changePassword.codigo, "", changePassword.celular)) {
            try {
                let user = await this.userRepository.findOne({
                    where: { celular: changePassword.celular, email: changePassword.email },
                });
                if (user) {
                    changePassword.newPassword = await this.passwordHasher.hashPassword(
                        changePassword.newPassword,
                    );
                    user.password = changePassword.newPassword;
                    await this.userRepository.update(
                        user,
                    );
                    return { message: "Cambio de contraseña exitoso" }
                } else {
                    throw new HttpErrors.NotFound('El usuario no existe');
                }


            } catch (error) {
                console.log(error);
            }
        } else {
            throw new HttpErrors.NotFound('Codigo de confirmación invalido');
        }
    }


}