export class CreateCollectionDto {
  contract_address: string;
  owner_address: string;
  name: string;
  symbol: string;
  base_uri: string;
  max_supply: number;
  price_per_mint: number;
  public_sale_start_at: number;
  public_sale_end_at?: number;
  launchpad_fee: number;
  project_treasury: string;
  launchpad_treasury: string;
  chain: string;
}
