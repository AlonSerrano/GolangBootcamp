// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BindingKey } from '@loopback/context';
import { PasswordHasher } from './services/hash.password.bcryptjs.service';
import { TokenService, UserService } from '@loopback/authentication';
import { Usuario } from './models';
import { Credentials } from './repositories';
import { UsuarioLib } from './lib';
import { IPINFOService, OTPService, MessageBird_Service } from './services';
import { SecurityBindings, UserProfile } from '@loopback/security';
export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'P3r!sS0n@pp!';
  export const TOKEN_EXPIRES_IN_VALUE = '600';
}
export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace ServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Usuario, Credentials>>(
    'user.service',
  );
  export const OTP_Service = BindingKey.create<OTPService>(
    'otp.service',
  );
  export const BIRD_Service = BindingKey.create<MessageBird_Service>(
    'messagebird.service',
  );
  export const IPINFO_Service = BindingKey.create<IPINFOService>(
    'ipinfo.service');
}

export namespace LibBindings {
  export const Usuario = BindingKey.create<UsuarioLib>(
    'services.usuario.lib',
  );
}
export namespace AuthenticationBindings {
  // Make `CURRENT_USER` the alias of SecurityBindings.USER for backward compatibility
  export const CURRENT_USER: BindingKey<UserProfile> = SecurityBindings.USER;
}