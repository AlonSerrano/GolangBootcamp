// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository, juggler, HasManyRepositoryFactory } from '@loopback/repository';
import { Usuario } from '../models';
import { inject } from '@loopback/core';
import { RolUsuario } from '../models/rol-usuario.model';

export class RolUsuarioRepository extends DefaultCrudRepository<
  RolUsuario,
  typeof RolUsuario.prototype.id
  >{
  constructor(@inject('datasources.db') dataSource: juggler.DataSource) {
    super(RolUsuario, dataSource);
  }
}