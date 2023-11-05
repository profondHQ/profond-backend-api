import { Injectable } from "@nestjs/common";
import { CreateCoinDto } from "./dto/create-coin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Coin } from "./schemas/coin.schema";
import { Model } from "mongoose";

@Injectable()
export class CoinService {
  constructor(@InjectModel(Coin.name) private coinModel: Model<Coin>) {}

  create(createCoinDto: CreateCoinDto): Promise<Coin> {
    const createdCoin = new this.coinModel(createCoinDto);
    return createdCoin.save();
  }

  findAll(minter_address?: string, chain?: string): Promise<Coin[]> {
    let matchQuery = {};
    if (minter_address) {
      matchQuery = { minter_address: minter_address };
    }

    if (chain) {
      matchQuery = { chain: chain, ...matchQuery };
    }

    return this.coinModel.find(matchQuery).select({ _id: 0, __v: 0 });
  }
}
