// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { inject } from '@loopback/core';
import { Rol } from '../models/rol.model';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id
  >{
  constructor(@inject('datasources.db') dataSource: juggler.DataSource) {
    super(Rol, dataSource);
  }
}