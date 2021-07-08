import { AcquistiProdotti } from './acquisti-prodotti';

export interface Acquisto {
  purchaseId: number;
  supplierId: number;
  billDate: Date;
  billNumber: number;
  acquistiProdotti: AcquistiProdotti[];
}
