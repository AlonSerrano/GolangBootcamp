import { post, requestBody, RestBindings, Request } from '@loopback/rest';
import { inject } from '@loopback/core';
import { reqRequireSignUp, reqSignIn, reqSignUp, reqRequireChangePassword, reqChangePassword, reqAgregarRol, specsSignIn } from './specs';
import { LibBindings } from '../../keys';
import { Credentials } from '../../repositories';
import { Usuario } from '../../models';
import { UserProfile } from '@loopback/security';
import { UsuarioLib } from '../../lib';
import { authorize } from '@loopback/authorization';
import { authenticate, AuthenticationBindings } from '@loopback/authentication';
import { basicAuthorization } from '../../services/authorizor.service';
export class UsuarioController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(LibBindings.Usuario) protected usuario: UsuarioLib,
  ) { }

  @post('/usuario/signIn', specsSignIn)
  async signIn(
    @requestBody(reqSignIn) credentials: Credentials,
  ) {
    return await this.usuario.signIn(this.req, credentials);
  }
  @post('/usuario/signUp', specsSignIn)
  async signUp(
    @requestBody(reqSignUp) newUserRequest: any,
  ) {
    return await this.usuario.signUp(newUserRequest);
  }
  @post('/usuario/requireSignUp', specsSignIn)
  async requireSignUp(
    @requestBody(reqRequireSignUp) newUserRequest: Usuario,
  ) {
    return await this.usuario.requireSignUp(newUserRequest.email, newUserRequest.celular);
  }
  @post('/usuario/requireChangePassword', specsSignIn)
  async requireChangePassword(
    @requestBody(reqRequireChangePassword) changePassword: any,
  ) {
    return await this.usuario.requireChangePassword(changePassword.email, changePassword.celular);
  }
  @post('/usuario/changePassword', specsSignIn)
  async changePassword(
    @requestBody(reqChangePassword) changePassword: any,
  ) {
    return await this.usuario.changePassword(changePassword);
  }

  @authorize({ allowedRoles: ['CONSUMIDOR'], voters: [basicAuthorization] })
  @authenticate('jwt')
  @post('/usuario/agregarRol', specsSignIn)
  async agregarRol(
    @requestBody(reqAgregarRol) agregarRol: any,
    @inject(AuthenticationBindings.CURRENT_USER) user: UserProfile
  ) {
    return await this.usuario.agregarRol(user, agregarRol.newRol);
  }
}