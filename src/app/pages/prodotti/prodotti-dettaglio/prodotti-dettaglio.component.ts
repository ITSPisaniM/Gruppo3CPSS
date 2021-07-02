import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prodotto } from './prodotto';

@Component({
  selector: 'app-prodotti-dettaglio',
  templateUrl: './prodotti-dettaglio.component.html',
  styleUrls: ['./prodotti-dettaglio.component.scss'],
})
export class ProdottiDettaglioComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public prodotto: Prodotto) {}

  ngOnInit(): void {}
}
