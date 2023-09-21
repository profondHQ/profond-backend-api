import { Test, TestingModule } from "@nestjs/testing";
import { CoinService } from "./coin.service";
import { Connection, Model, connect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { CoinSchema } from "./schemas/coin.schema";
import { getModelToken } from "@nestjs/mongoose";
import { Coin } from "./schemas/coin.schema";

describe("CoinService", () => {
  let service: CoinService;

  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let coinModel: Model<Coin>;

  const newCoin = {
    contract_address: "contract_address",
    minter_address: "minter_address",
    name: "name",
    symbol: "symbol",
    decimals: 18,
    total_supply: 10000,
    is_pausable: true,
    is_mintable: true,
    is_burnable: true
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    coinModel = mongoConnection.model(Coin.name, CoinSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoinService,
        { provide: getModelToken(Coin.name), useValue: coinModel }
      ]
    }).compile();

    service = module.get<CoinService>(CoinService);
  });

  it("should return object after create", async () => {
    const result = await service.create(newCoin);
    expect(result.contract_address).toBe(newCoin.contract_address);
    expect(result.name).toBe(newCoin.name);
    expect(result.symbol).toBe(newCoin.symbol);
    expect(result.total_supply).toBe(newCoin.total_supply);
    expect(result.is_pausable).toBe(newCoin.is_pausable);
    expect(result.is_mintable).toBe(newCoin.is_mintable);
    expect(result.is_burnable).toBe(newCoin.is_burnable);
  });

  it("should return collection for filtered minter_address", async () => {
    await service.create(newCoin);

    const result = await service.findAll("minter_address");

    expect(result[0].minter_address).toBe("minter_address");
  });
});
