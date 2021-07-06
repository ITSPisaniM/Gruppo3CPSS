import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Page } from '../../models/page';
import { ProdottiDettaglioComponent } from './prodotti-dettaglio/prodotti-dettaglio.component';
import { Prodotto } from '../../models/prodotto';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss'],
})
export class ProdottiComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listaProdotti: Prodotto[];
  nProdotti: number;
  length: number;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20, 25, 100];

  constructor(
    private prodottiService: ProdottiService,
    private dialog: MatDialog
  ) {}

  populateTable(prodotti: Prodotto[], elementiTotali: number) {
    this.listaProdotti = prodotti;
    this.length = elementiTotali;
  }

  openDettaglio(prodotto: Prodotto): void {
    this.dialog.open(ProdottiDettaglioComponent, {
      data: prodotto,
    });
  }

  pageEvent(event: PageEvent): void {
    this.prodottiService
      .getProdottiPagination(event.pageIndex, event.pageSize)
      .subscribe((res: Page<Prodotto[]>) => {
        this.populateTable(res.data.content, res.data.totalElements);
      });
  }

  ngOnInit() {
    this.prodottiService
      .getProdottiPagination(0, this.pageSize)
      .subscribe((res: Page<Prodotto[]>) => {
        this.populateTable(res.data.content, res.data.totalElements);
      });
  }
}
