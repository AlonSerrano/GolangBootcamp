// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { HttpErrors } from '@loopback/rest';
import { UserRepository, Credentials } from '../repositories/usuario.repository';
import { Usuario } from '../models/usuario.model';
import { UserProfile, securityId } from '@loopback/security';
import { repository } from '@loopback/repository';
import { PasswordHasher } from './hash.password.bcryptjs.service';
import { PasswordHasherBindings } from '../keys';
import { inject } from '@loopback/context';

export class MyUserService {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<Usuario> {
    const invalidCredentialsError = 'Correo, celular o contraseña invalidos';
    let foundUser;
    if (credentials.celular == null && credentials.email == null) {
      throw new HttpErrors.UnprocessableEntity('Ingresa al menos email o celular');
    }
    if (credentials.email) {
      foundUser = await this.userRepository.findOne({
        include: [{ relation: 'roles' }],
        where: { email: credentials.email },
      });
    } else if (credentials.celular) {
      foundUser = await this.userRepository.findOne({
        include: [{ relation: 'roles' }],
        where: { celular: credentials.celular },
      });
    }
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    if (!foundUser.celularValid && !foundUser.emailValid) {
      throw new HttpErrors.NotAcceptable('El usuario no a sido validado');
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  async getUser(newUserRequest: { email: string; }) {
    return this.userRepository.findOne({
      where: { email: newUserRequest.email },
    });
  }



  convertToUserProfile(user: Usuario): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.nombreUno) userName = `${user.nombreUno}`;
    if (user.apellidoUno)
      userName = user.nombreUno
        ? `${userName} ${user.apellidoUno}`
        : `${user.apellidoUno}`;
    const userProfile = {
      [securityId]: user.id,
      celular: user.celular,
      email: user.email,
      name: userName,
      id: user.id,
      roles: user.roles?.map(x => x.idRol),
    };

    return userProfile;
  }
}