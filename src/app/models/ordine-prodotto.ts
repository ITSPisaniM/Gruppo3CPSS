export interface OrdineProdotto {
  orderItemId: string;
  amazonOrderId: string;
  asin: string;
  title: string;
  quantityOrdered: number;
  quantityShipped: number;
  pointsGrantedPointsNumber: number;
  pointsGrantedPointsMonetaryValueCurrencyCode: string;
  pointsGrantedPointsMonetaryValueAmount: number;
  itemPriceCurrencyCode: string;
  itemPriceAmount: number;
  shippingPriceCurrencyCode: string;
  shippingPriceAmount: number;
  promotionIds: string;
}
