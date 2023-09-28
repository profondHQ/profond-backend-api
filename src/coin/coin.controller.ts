import { Controller, Get, Query } from "@nestjs/common";
import { CoinService } from "./coin.service";

@Controller("coins")
export class CoinController {
  constructor(private readonly coinService: CoinService) { }

  @Get()
  findAll(
    @Query("minter_address") minter_address?: string,
    @Query("chain") chain?: string
  ) {
    return this.coinService.findAll(minter_address, chain);
  }
}
