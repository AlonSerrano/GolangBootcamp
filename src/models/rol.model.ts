// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property, hasMany, hasOne } from '@loopback/repository';
import { RolUsuario } from './rol-usuario.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Rol extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'date',
  })
  creado?: string;

  @property({
    type: 'date',
  })
  actualizado?: string;

  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // roles?: string[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}