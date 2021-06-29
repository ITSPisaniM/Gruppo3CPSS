import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent implements OnInit {

  constructor(
    private pp:AppComponent,
    private prod:ProdottiService,
  ) { }

  public listaProdotti;

  //elementi da visualizzzare nella pagina
  private elPerPage : number;
  getElPerPage(value: number) {
    this.elPerPage = value;
    this.prod.getProdottiPagination(0, this.elPerPage).subscribe((res)=>{
      this.listaProdotti = res.data;
      console.log(this.listaProdotti);
    })
  }

  ngOnInit(): void { 
    
  }


}
