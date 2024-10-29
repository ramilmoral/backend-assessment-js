import postgres, { Sql } from 'postgres';
import { Env } from '..';

export class DB {
  static sql: Sql;

  static connect(env: Env): void {
    this.sql = postgres({
      host: env.PGHOST,
      database: env.PGDATABASE,
      username: env.PGUSER,
      password: decodeURIComponent(`${env.PGPASSWORD}`),
      port: 5432,
      ssl: 'require',
      connection: {
        options: `project=${env.ENDPOINT_ID}`,
      },
    });
  }
}
