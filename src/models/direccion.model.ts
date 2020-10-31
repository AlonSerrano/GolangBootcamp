// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property } from '@loopback/repository';

@model()
export class Direccion extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  idCodigoPostal: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  calle: string;

  @property({
    type: 'string',
    required: true,
  })
  exterior: string;

  @property({
    type: 'string',
    required: true,
  })
  interior: string;

  @property({
    type: 'string',
    required: true,
  })
  colonia: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  municipio: string;

  @property({
    type: 'string',
    required: true,
  })
  referencias: string;

  @property({
    type: 'string',
    required: true,
  })
  latitud: string;

  @property({
    type: 'string',
    required: true,
  })
  longitud: string;

  @property({
    type: 'date',
  })
  creado?: string;

  @property({
    type: 'date',
  })
  actualizado?: string;

  constructor(data?: Partial<Direccion>) {
    super(data);
  }
}