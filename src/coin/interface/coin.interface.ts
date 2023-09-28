export class Coin {
  contract_address: string;
  minter_address: string;
  name: string;
  symbol: string;
  decimals: number;
  total_supply: number;
  is_pausable: boolean;
  is_mintable: boolean;
  is_burnable: boolean;
  chain: string;
}
