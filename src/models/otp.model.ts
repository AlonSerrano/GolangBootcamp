// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property } from '@loopback/repository';

@model()
export class Otp extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  typeCorreoCelular: string;

  @property({
    type: 'string',
    required: true,
  })
  correocelular: string;

  @property({
    type: 'string',
  })
  typeCode: string;

  @property({
    type: 'boolean',
  })
  esValido: boolean;

  @property({
    type: 'date',
    required: true,
  })
  creado: string;

  constructor(data?: Partial<Otp>) {
    super(data);
  }
}