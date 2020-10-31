// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property } from '@loopback/repository';

@model()
export class Negocio extends Entity {
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
    type: 'string',
    required: true,
  })
  etiquetas: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'boolean',
    required: true,
  })
  recogeLocal: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  enviaDomicilioPorSuCuenta: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  enviaDomicilioPorApp: boolean;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;


  @property({
    type: 'string',
    required: true,
  })
  idDireccion: string;

  @property({
    type: 'string',
    required: true,
  })
  idCatalogo: string;

  @property({
    type: 'string',
    required: true,
  })
  idHorarios: string;

  @property({
    type: 'string',
    required: true,
  })
  idCobertura: string;

  @property({
    type: 'boolean',
    required: true,
  })

  activo: boolean;
  @property({
    type: 'date',
  })
  creado?: string;

  @property({
    type: 'date',
  })
  actualizado?: string;


  constructor(data?: Partial<Negocio>) {
    super(data);
  }
}