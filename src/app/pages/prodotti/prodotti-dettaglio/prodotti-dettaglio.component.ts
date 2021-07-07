import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prodotto } from '../../../models/prodotto';

@Component({
  selector: 'app-prodotti-dettaglio',
  templateUrl: './prodotti-dettaglio.component.html',
  styleUrls: ['./prodotti-dettaglio.component.scss'],
})
export class ProdottiDettaglioComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public prodotto: Prodotto) {}
}
