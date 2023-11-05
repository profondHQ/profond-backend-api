import "dotenv/config";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CoinModule } from "./coin/coin.module";
import { CollectionModule } from "./collection/collection.module";
import { StatsModule } from "./stats/stats.module";
import { PostgresModule } from "./postgres/postgres.module";

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGODB_URL),
    // CoinModule,
    // CollectionModule,
    StatsModule,
    PostgresModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
