import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
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
    private prod:ProdottiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cookie: CookieService,
  ) { }

  public listaProdotti;
  public nProdotti;
  loginForm: FormGroup;

  //elementi da visualizzzare nella pagina
  private elPerPage : number;
  getElPerPage(value: number) {
    this.elPerPage = value;
    console.log("size: " + value)
    this.myLazyLoad();
 
  }
  private index:number;
  getIndex(value:number){
    this.index = value;
    console.log("index: " + value)
    this.myLazyLoad();
  }

  async myLazyLoad(){
    await this.elPerPage != null;
    await this.index != null;
    this.prod.getProdottiPagination(this.index, this.elPerPage).subscribe((res)=>{
      this.listaProdotti = res.data;
      console.log(this.listaProdotti);
    })
  }

  openDettaglio(prodotto: Prodotto): void {
    this.dialog.open(DettaglioComponent, {
      data: prodotto,
    });
  }

  //arrayEl:ProdottoDaComprare[];
  spostaNelCarrello(item:Prodotto){
    var  elDaComprareEQta: ProdottoDaComprare = {
    prodotto : item,
    qta : this.loginForm.controls.qta.value
  } 
  
  window.localStorage.setItem("carrello", window.localStorage.getItem("carrello") == null ? 
                              JSON.stringify(elDaComprareEQta) : window.localStorage.getItem("carrello") + "," + JSON.stringify(elDaComprareEQta));
  
  
  }

   ngOnInit(){ 
    this.loginForm = this.fb.group({
      qta: new FormControl(10, [Validators.required]),
    });
  }


}
