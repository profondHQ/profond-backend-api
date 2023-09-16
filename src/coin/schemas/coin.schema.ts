import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoinDocument = HydratedDocument<Coin>;

@Schema()
export class Coin {
  @Prop({ required: true })
  contract_address: string;

  @Prop({ required: true })
  minter_address: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop({ required: true })
  decimals: number;

  @Prop({ required: true })
  total_supply: number;

  @Prop({ required: true })
  is_pausable: boolean;

  @Prop({ required: true })
  is_mintable: boolean;

  @Prop({ required: true })
  is_burnable: boolean;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
