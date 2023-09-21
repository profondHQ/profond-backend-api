import { Test, TestingModule } from "@nestjs/testing";
import { CollectionService } from "./collection.service";
import { Connection, Model, connect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { CollectionSchema } from "./schemas/collection.schema";
import { getModelToken } from "@nestjs/mongoose";
import { Collection } from "./schemas/collection.schema";

describe("CollectionService", () => {
  let service: CollectionService;

  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let collectionModel: Model<Collection>;

  const newCollection = {
    contract_address: "contract_address",
    owner_address: "owner_address",
    name: "name",
    symbol: "symbol",
    base_uri: "base_uri",
    max_supply: 10000,
    price_per_mint: 1000000,
    public_sale_start_at: 0,
    public_sale_end_at: 100,
    launchpad_fee: 1,
    project_treasury: "project_treasury",
    launchpad_treasury: "launchpad_treasury"
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    collectionModel = mongoConnection.model(Collection.name, CollectionSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionService,
        { provide: getModelToken(Collection.name), useValue: collectionModel }
      ]
    }).compile();

    service = module.get<CollectionService>(CollectionService);
  });

  it("should return object after create", async () => {
    const result = await service.create(newCollection);
    expect(result.contract_address).toBe(newCollection.contract_address);
    expect(result.owner_address).toBe(newCollection.owner_address);
    expect(result.name).toBe(newCollection.name);
    expect(result.symbol).toBe(newCollection.symbol);
    expect(result.max_supply).toBe(newCollection.max_supply);
    expect(result.price_per_mint).toBe(newCollection.price_per_mint);
    expect(result.public_sale_start_at).toBe(
      newCollection.public_sale_start_at
    );
    expect(result.public_sale_end_at).toBe(newCollection.public_sale_end_at);
    expect(result.launchpad_fee).toBe(newCollection.launchpad_fee);
    expect(result.project_treasury).toBe(newCollection.project_treasury);
    expect(result.launchpad_treasury).toBe(newCollection.launchpad_treasury);
  });

  it("should return collection for filtered owner_address", async () => {
    await service.create(newCollection);

    const result = await service.findAll("owner_address");

    expect(result[0].owner_address).toBe("owner_address");
  });
});
