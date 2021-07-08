import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ordine } from 'src/app/models/ordine';
import { OrdineProdotto } from 'src/app/models/ordine-prodotto';

@Component({
  selector: 'app-ordini-dettaglio',
  templateUrl: './ordini-dettaglio.component.html',
  styleUrls: ['./ordini-dettaglio.component.scss'],
})
export class OrdiniDettaglioComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public ordine: Ordine) {}
  displayedColumns: string[] = [
    'asin',
    'title',
    'quantityOrdered',
    'quantityShipped',
    'itemPriceAmount',
    'shippingPriceAmount',
    'itemPriceCurrencyCode',
  ];
  rpod: OrdineProdotto;
  ngOnInit(): void {
    console.log(this.ordine);
  }
}
