// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property } from '@loopback/repository';

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
export class RolUsuario extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  idRol: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;


  @property({
    type: 'string',
  })
  idUsuarioDependiente: string;


  @property({
    type: 'date',
  })
  creado?: string;

  @property({
    type: 'date',
  })
  actualizado?: string;




  constructor(data?: Partial<RolUsuario>) {
    super(data);
  }
}