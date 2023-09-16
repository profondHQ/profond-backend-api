import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';

@Controller('coins')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Post()
  create(@Body() createCoinDto: CreateCoinDto) {
    return this.coinService.create(createCoinDto);
  }

  @Get()
  findAll(@Query('minter_address') minter_address?: string) {
    return this.coinService.findAll(minter_address);
  }
}
