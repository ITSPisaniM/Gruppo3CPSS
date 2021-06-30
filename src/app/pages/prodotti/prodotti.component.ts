import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { Prodotto } from './dettaglio/prodotto';


@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent implements OnInit {

  constructor(
    private prod:ProdottiService,
    private dialog: MatDialog
  ) { }

  public listaProdotti;
  public nProdotti;

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

   ngOnInit(){ 
  }


}
