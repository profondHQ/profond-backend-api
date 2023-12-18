import { Inject, Injectable } from "@nestjs/common";
import { PG_CONNECTION } from "../constants";

@Injectable()
export class StatsService {
  constructor(@Inject(PG_CONNECTION) private conn: any) { }

  async findAll(
    wallet_address?: string,
    coin_address?: string,
    quantity_min?: number,
    quantity_max?: number,
    timestamp_min?: number,
    timestamp_max?: number,
    is_asc: string = "true",
    limit: number = 10
  ) {
    let query = `SELECT * FROM transactions `;
    let whereQuery = ``;

    if (wallet_address) {
      whereQuery = whereQuery.concat(
        whereQuery ? "AND" : "WHERE",
        `
          wallet_address = '${wallet_address}'
        `
      );
    }

    if (coin_address) {
      whereQuery = whereQuery.concat(
        whereQuery ? "AND" : "WHERE",
        `
          coin_address = '${coin_address}'
        `
      );
    }

    if (quantity_min) {
      whereQuery = whereQuery.concat(
        whereQuery ? "AND" : "WHERE",
        `
          quantity >= ${quantity_min}
        `
      );
    }

    if (quantity_max) {
      whereQuery = whereQuery.concat(
        whereQuery ? "AND" : "WHERE",
        `
          quantity <= ${quantity_max}
        `
      );
    }

    if (timestamp_min) {
      whereQuery = whereQuery.concat(
        whereQuery ? "AND" : "WHERE",
        `
          timestamp >= ${timestamp_min}
        `
      );
    }

    if (timestamp_max) {
      whereQuery = whereQuery.concat(
        whereQuery ? "AND" : "WHERE",
        `
          timestamp <= ${timestamp_max}
        `
      );
    }

    // default sort by timestamp, limit by default 10
    query = query.concat(
      whereQuery,
      is_asc === "true" ? `ORDER BY timestamp ASC` : `ORDER BY timestamp DESC`,
      `
          LIMIT ${limit}
      `
    );

    const res = await this.conn.query(query);
    return res.rows;
  }

  async coinStats(coin_address: string) {
    const stats = (
      await this.conn.query(
        `SELECT 
          COUNT(*) as total_transactions, 
          SUM(quantity) as total_volume,
          COUNT(distinct wallet_address) total_users
         FROM transactions 
         WHERE coin_address = '${coin_address}'`
      )
    ).rows[0];

    return {
      total_transactions: parseInt(stats.total_transactions),
      total_volume: stats.total_volume,
      total_users: parseInt(stats.total_users)
    };
  }
}
