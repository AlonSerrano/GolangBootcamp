import { BootMixin } from "@loopback/boot";
import { ApplicationConfig, BindingKey } from "@loopback/core";
import {
  RestExplorerBindings,
  RestExplorerComponent
} from "@loopback/rest-explorer";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import { ServiceMixin } from "@loopback/service-proxy";
import path from "path";
import { MySequence } from "./sequence";
import { AuthorizationComponent } from '@loopback/authorization';
import { AuthenticationComponent, registerAuthenticationStrategy } from "@loopback/authentication";
import { JWTAuthenticationStrategy } from './auth-strategies/jwt-strategy';
import { TokenServiceBindings, TokenServiceConstants, PasswordHasherBindings, ServiceBindings, LibBindings } from './keys';
import { AppDataSource } from './datasources';
import { OTPService, JWTService, BcryptHasher, MyUserService, IPINFOService, MessageBird_Service } from './services';
import { UsuarioLib } from './lib';
const pkg: PackageInfo = require('../package.json');
export const PackageKey = BindingKey.create<PackageInfo>('application.package');
/**
 * Information from package.json
 */
export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}
export class PerissonApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.setUpBindings();

    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    // authentication
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/explorer"
    });
    this.component(RestExplorerComponent);

    this.bind('datasources.db').to(new AppDataSource());
    this.dataSource(new AppDataSource());


    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true
      }
    };
  }
  setUpBindings(): void {
    this.bind(PackageKey).to(pkg);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE);
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(ServiceBindings.USER_SERVICE).toClass(MyUserService);
    this.bind(LibBindings.Usuario).toClass(UsuarioLib);
    this.bind(ServiceBindings.OTP_Service).toClass(OTPService);
    this.bind(ServiceBindings.BIRD_Service).toClass(MessageBird_Service);
    this.bind(ServiceBindings.IPINFO_Service).toClass(IPINFOService);
  }
}
