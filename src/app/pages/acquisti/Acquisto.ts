import { AcquistiProdotti } from "./AcquistiProdotti";


export interface Acquisto {
    purchaseId: number;
    supplierId: number;
    billDate: Date;
    billNumber: number;
    acquistiProdotti: AcquistiProdotti[];
}