import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { Prodotto } from './dettaglio/prodotto';
import { ProdottoDaComprare } from './ProdottoDaComprare';


@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent implements OnInit {

  constructor(
    private prod: ProdottiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  public listaProdotti;
  public nProdotti;
  loginForm: FormGroup;

  carrello: string;
  message: string;
  elementiCarrello: ProdottoDaComprare[];

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

  async myLazyLoad() {
    await this.elPerPage != null;
    await this.index != null;
    this.prod.getProdottiPagination(this.index, this.elPerPage).subscribe((res) => {
      this.listaProdotti = res.data.content;
    })
  }

  openDettaglio(prodotto: Prodotto): void {
    this.dialog.open(DettaglioComponent, {
      data: prodotto,
    });
  }

  //arrayEl:ProdottoDaComprare[];
  spostaNelCarrello(item: Prodotto) {

    var elDaComprareEQta: ProdottoDaComprare = {
      prodotto: item,
      qta: this.loginForm.controls.qta.value
    }

    if (this.controllaPresenzaCarrello(elDaComprareEQta)) {
      this.aggiornaCarrello();
      this.openSnackBar("modificato la q.ta dell'ordine");
    } else {
      window.localStorage.setItem("carrello", window.localStorage.getItem("carrello") == null ?
        JSON.stringify(elDaComprareEQta) : window.localStorage.getItem("carrello") + "," + JSON.stringify(elDaComprareEQta));

      this.openSnackBar("aggiunto");
    }
  }

  aggiornaCarrello(){
    window.localStorage.setItem("carrello", JSON.stringify(this.elementiCarrello));
  }

  controllaPresenzaCarrello(item: ProdottoDaComprare): boolean {
    this.getElementCarrello();
    return this.findElement(item);
  }

  findElement(item: ProdottoDaComprare): boolean {
    if(this.elementiCarrello != undefined){

      this.elementiCarrello.find
      this.elementiCarrello.forEach(element => {
        if (element.prodotto.asin == item.prodotto.asin) {
          element = item;
          return true
        }
      });
    }
    return false;
  }

  getCarrello() {
    try{
      this.carrello = "[" + window.localStorage.getItem("carrello") + "]";
    }catch(exc){

    }
  }

  getElementCarrello() {
    if(this.carrello != undefined){
      this.elementiCarrello = JSON.parse(this.carrello);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      qta: new FormControl(10, [Validators.required]),
    });
  }

  openSnackBar(string: string) {
    this._snackBar.open(string, "ok");
  }

}
