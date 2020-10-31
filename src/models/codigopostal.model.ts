// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property } from '@loopback/repository';

@model()
export class CodigoPostal extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoPostal: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoISO: string;

  @property({
    type: 'string',
  })
  municipio: string;

  @property({
    type: 'string',
  })
  ciudad: string;

  @property({
    type: 'string',
  })
  barrio: string;

  @property({
    type: 'date',
    required: true,
  })
  creado: string;

  @property({
    type: 'date',
    required: true,
  })
  actualizado: string;

  constructor(data?: Partial<CodigoPostal>) {
    super(data);
  }
}