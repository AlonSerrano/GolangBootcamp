// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property, hasMany, hasOne } from '@loopback/repository';
import { RolUsuario } from './rol-usuario.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  celular: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreUno: string;

  @property({
    type: 'string',
  })
  nombreDos?: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoUno: string;

  @property({
    type: 'string',
  })
  apellidoDos?: string;

  @property({
    type: 'boolean',
  })
  celularValid: boolean;

  @property({
    type: 'boolean',
  })
  emailValid: boolean;

  @property({
    type: 'date',
  })
  creado?: string;

  @property({
    type: 'date',
  })
  actualizado?: string;

  @hasMany(() => RolUsuario, { keyTo: 'idUsuario' })
  roles?: RolUsuario[];
  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // roles?: string[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}