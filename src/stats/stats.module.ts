import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { PostgresModule } from "src/postgres/postgres.module";

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [PostgresModule]
})
export class StatsModule {}
