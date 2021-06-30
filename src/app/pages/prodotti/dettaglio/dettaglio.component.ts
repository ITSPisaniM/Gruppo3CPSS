import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prodotto } from './prodotto';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss'],
})
export class DettaglioComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public prodotto: Prodotto) {}

  ngOnInit(): void {}
}
