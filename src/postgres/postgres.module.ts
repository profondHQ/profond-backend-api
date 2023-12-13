import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { PG_CONNECTION } from "src/constants";

const PG_CONNECTION_STRING = process.env.PG_CONNECTION_STRING;

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({ connectionString: PG_CONNECTION_STRING })
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider]
})
export class PostgresModule {}
