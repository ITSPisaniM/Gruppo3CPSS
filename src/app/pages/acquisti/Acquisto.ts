import { Prodotto } from "../prodotti/dettaglio/prodotto";

export interface Acquisto {
    purchaseId: number;
    supplierId: number;
    billDate: Date;
    billNumber: number;
    acquistiProdotti: Prodotto[];
}