import { Test, TestingModule } from "@nestjs/testing";
import { StatsService } from "./stats.service";
import PgMock2 from "pgmock2";
const pg = new PgMock2();

describe("StatsService", () => {
  let service: StatsService;

  beforeAll(async () => {
    pg.add(
      `SELECT 
              COUNT(*) as total_transactions,
              SUM(quantity) as total_volume,
              COUNT(distinct wallet_address) total_users
            FROM transactions 
            WHERE coin_address = 'coin_address'`,
      [],
      {
        rowCount: 1,
        rows: [
          { total_transactions: 100, total_volume: 19000, total_users: 100 }
        ]
      }
    );
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatsService, { provide: "PG_CONNECTION", useValue: pg }]
    }).compile();

    service = module.get<StatsService>(StatsService);
  });

  it("coinStats works", async () => {
    const result = await service.coinStats("coin_address");

    expect(result).toEqual({
      total_transactions: 100,
      total_volume: 19000,
      total_users: 100
    });
  });
});
