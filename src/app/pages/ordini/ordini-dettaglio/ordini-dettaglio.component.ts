import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ordine } from '../ordine';

@Component({
  selector: 'app-ordini-dettaglio',
  templateUrl: './ordini-dettaglio.component.html',
  styleUrls: ['./ordini-dettaglio.component.scss'],
})
export class OrdiniDettaglioComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public ordine: Ordine) {}

  ngOnInit(): void {
    console.log(this.ordine);
  }
}
