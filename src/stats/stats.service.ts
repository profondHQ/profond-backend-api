import { Inject, Injectable } from "@nestjs/common";
import { PG_CONNECTION } from "src/constants";

@Injectable()
export class StatsService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async findAll() {
    const res = await this.conn.query("SELECT * FROM transactions");
    return res.rows;
  }

  findOne(id: number) {
    return `This action returns a #${id} stat`;
  }
}
