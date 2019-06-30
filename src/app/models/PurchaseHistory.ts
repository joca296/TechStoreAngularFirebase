import { ShoppingCartItemExtended } from './ShoppingCartItemExtended';

export class PurchaseHistory {
  id:string;
  itemsPurchased:ShoppingCartItemExtended[];
  total:number;
  dateOfPurchase:number;
}
