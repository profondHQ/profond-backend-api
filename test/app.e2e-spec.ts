import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    return await app.init();
  });

  afterAll((done) => {
    app.close();
    done();
  });

  it("Server works", async () => {
    const result = await request(app.getHttpServer()).get("/");

    expect(result.statusCode).toEqual(200);
    expect(result.text).toEqual('{"status":1}');
  });
});
