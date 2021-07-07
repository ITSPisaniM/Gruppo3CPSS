import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Acquisto } from 'src/app/models/acquisto';

@Component({
  selector: 'app-acquisti-dettaglio',
  templateUrl: './acquisti-dettaglio.component.html',
  styleUrls: ['./acquisti-dettaglio.component.scss'],
})
export class AcquistiDettaglioComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public acquisto: Acquisto
  ) {}

  ngOnInit(): void {}
}
