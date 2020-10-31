// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property } from '@loopback/repository';

@model()
export class Giro extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  constructor(data?: Partial<Giro>) {
    super(data);
  }
}