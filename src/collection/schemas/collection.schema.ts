import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection {
  @Prop({ required: true })
  contract_address: string;

  @Prop({ required: true })
  owner_address: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  base_uri: string;

  @Prop({ required: true })
  max_supply: number;

  @Prop({ required: true })
  price_per_mint: number;

  @Prop({ required: true })
  public_sale_start_at: number;

  @Prop()
  public_sale_end_at?: number;

  @Prop({ required: true })
  launchpad_fee: number;

  @Prop({ required: true })
  project_treasury: string;

  @Prop({ required: true })
  launchpad_treasury: string;

  @Prop()
  chain: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
