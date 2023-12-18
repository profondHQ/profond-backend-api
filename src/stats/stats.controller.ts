import { Controller, Get, Param, Query } from "@nestjs/common";
import { StatsService } from "./stats.service";

@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @Get("/coin/:coin_address")
  findStats(@Param("coin_address") coin_address) {
    return this.statsService.coinStats(coin_address);
  }

  @Get("/transactions")
  findAll(@Query() query: any) {
    const {
      wallet_address,
      coin_address,
      quantity_min,
      quantity_max,
      timestamp_min,
      timestamp_max,
      is_asc,
      limit
    } = query;
    return this.statsService.findAll(
      wallet_address,
      coin_address,
      quantity_min,
      quantity_max,
      timestamp_min,
      timestamp_max,
      is_asc,
      limit
    );
  }
}
