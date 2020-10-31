// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Usuario } from '../models';
import { inject } from '@loopback/core';
import { RolUsuario } from '../models/rol-usuario.model';
import { RolUsuarioRepository } from './rol-usuario.repository';
export type Credentials = {
  email?: string;
  celular?: number;
  password: string;
};
export class UserRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  RolUsuario
  > {
  public readonly roles: HasManyRepositoryFactory<
    RolUsuario,
    typeof RolUsuario.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: juggler.DataSource,
    @repository(RolUsuarioRepository) protected rolusuarioRepository: RolUsuarioRepository) {
    super(Usuario, dataSource);
    this.roles = this.createHasManyRepositoryFactoryFor(
      'roles',
      async () => rolusuarioRepository,
    );
    // add this line to register inclusion resolver
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);

  }
}
