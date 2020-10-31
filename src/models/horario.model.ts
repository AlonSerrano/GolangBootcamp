// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property } from '@loopback/repository';

@model()
export class Horario extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  idNegocio: string;

  @property({
    type: 'string',
    required: true,
  })
  dia: string;

  @property({
    type: 'date',
    required: true,
  })
  inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fin: string;

  @property({
    type: 'date',
  })
  creado?: string;

  @property({
    type: 'date',
  })
  actualizado?: string;

  constructor(data?: Partial<Horario>) {
    super(data);
  }
}