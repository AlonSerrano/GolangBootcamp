// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Credentials } from '../repositories/usuario.repository';
import isemail from 'isemail';
import { HttpErrors } from '@loopback/rest';

export function validateCredentials(credentials: Credentials) {
  // Validate Email
  if (credentials.celular == null && credentials.email == null) {
    throw new HttpErrors.UnprocessableEntity('Ingresa al menos email o telefono');
  }
}
