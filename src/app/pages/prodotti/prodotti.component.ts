import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Page } from '../../models/page';
import { ProdottiDettaglioComponent } from './prodotti-dettaglio/prodotti-dettaglio.component';
import { Prodotto } from '../../models/prodotto';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdottoDaComprare } from 'src/app/models/ProdottoDaComprare';

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
  loginForm: FormGroup;

  constructor(
    private prodottiService: ProdottiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      qta: new FormControl(10, [Validators.required]),
    });
    this.myLazyLoad();
  }

  populateTable(prodotti: Prodotto[], elementiTotali: number) {
    this.listaProdotti = prodotti;
    this.length = elementiTotali;
  }

  //elementi da visualizzzare nella pagina
  private elPerPage: number;
  getElPerPage(value: number) {
    this.elPerPage = value;
    this.myLazyLoad();
  }

  private index: number;
  getIndex(value: number) {
    this.index = value;
    this.myLazyLoad();
  }

  carrello: string;
  message: string;
  elementiCarrello: ProdottoDaComprare[] = [];
  spostaNelCarrello(item: Prodotto) {
    if (window.localStorage.getItem('carrello') != null)
      this.elementiCarrello = JSON.parse(
        window.localStorage.getItem('carrello')
      );
    else this.elementiCarrello = [];

    var elDaComprareEQta: ProdottoDaComprare = {
      prodotto: item,
      quantita: this.loginForm.controls.qta.value,
    };

    if (this.controllaPresenzaCarrello(elDaComprareEQta)) {
      this.aggiornaCarrello(elDaComprareEQta);
      this.openSnackBar("modificato la q.ta dell'ordine");
    } else {
      this.elementiCarrello.push(elDaComprareEQta);

      window.localStorage.setItem(
        'carrello',
        JSON.stringify(this.elementiCarrello)
      );

      this.openSnackBar('aggiunto');
    }
  }

  aggiornaCarrello(el: ProdottoDaComprare) {
    let k = this.elementiCarrello.find(
      (j) => j.prodotto.asin == el.prodotto.asin
    );
    let indx = this.elementiCarrello.indexOf(k);

    k.quantita = el.quantita;

    this.elementiCarrello[indx] = k;

    window.localStorage.setItem(
      'carrello',
      JSON.stringify(this.elementiCarrello)
    );

    this.loginForm.controls.qta.setValue(10);
  }

  controllaPresenzaCarrello(item: ProdottoDaComprare): boolean {
    return this.findElement(item);
  }

  findElement(item: ProdottoDaComprare): boolean {
    if (this.elementiCarrello != undefined) {
      console.log(this.elementiCarrello);
      var rr = this.elementiCarrello.find(
        (element) => element.prodotto.asin == item.prodotto.asin
      );

      return rr == null ? false : true;
    }
  }

  getCarrello() {
    try {
      this.carrello = '[' + window.localStorage.getItem('carrello') + ']';
    } catch (exc) {}
  }

  getElementCarrello() {
    if (window.localStorage.getItem('carrello') != undefined) {
      //controllo che il carrello non sia vuoto
      this.elementiCarrello = JSON.parse(
        window.localStorage.getItem('carrello')
      );
    }
  }

  openDettaglio(prodotto: Prodotto): void {
    this.dialog.open(ProdottiDettaglioComponent, {
      data: prodotto,
      width: '80%',
    });
  }

  async myLazyLoad() {
    this.prodottiService
      .getProdottiPagination(this.index, this.elPerPage)
      .subscribe((res) => {
        this.listaProdotti = res.data.content;
      });
  }

  pageEvent(event: PageEvent): void {
    this.prodottiService
      .getProdottiPagination(event.pageIndex, event.pageSize)
      .subscribe((res: Page<Prodotto[]>) => {
        this.populateTable(res.data.content, res.data.totalElements);
      });
  }

  openSnackBar(string: string) {
    this._snackBar.open(string, 'ok');
    this.prodottiService
      .getProdottiPagination(0, this.pageSize)
      .subscribe((res: Page<Prodotto[]>) => {
        this.populateTable(res.data.content, res.data.totalElements);
      });
  }
}
