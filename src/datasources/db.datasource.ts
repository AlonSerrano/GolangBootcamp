import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as devConfig from './dev.ds.json'; // import dev json
import * as prodConfig from './prod.ds.json'; // import prod json

export class DataSourceSettings {
  name: string
  connector: string
  url?: string
  file?: string
};

let config: DataSourceSettings;

if (process.env.NODE_ENV === 'PRODUCTION') {
  console.log(' --- Database in Prod Mode --- ')
  config = prodConfig;
  config.url = process.env.DATABASE_URL; // can add properties from environment var at start.
  console.log(config);
} else {
  console.log(' --- Database in Dev Mode --- ')
  config = devConfig;
  console.log(config);
}

export class AppDataSource extends juggler.DataSource {
  static dataSourceName = 'db';

  constructor(
    @inject('ds.config.db', { optional: true }) dsConfig: object = config,
  ) {
    console.log(dsConfig);
    super(dsConfig);
  }
}