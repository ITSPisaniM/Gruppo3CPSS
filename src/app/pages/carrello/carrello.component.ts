import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarrelloService } from 'src/app/services/carrello.service';
import { ProdottoDaComprare } from '../../models/ProdottoDaComprare';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {

  carrello: string;

  elementiCarrello: ProdottoDaComprare[];

  constructor(
    private cart: CarrelloService,
  ) { }

  ngOnInit(): void {
    this.getCarrello();
    this.findElement();
  }

  getCarrello(){
    this.carrello = "[" + window.localStorage.getItem("carrello") + "]";
  }


  findElement(){
    this.elementiCarrello = JSON.parse(this.carrello);
    
  }
  svuota(){
    window.localStorage.removeItem("carrello");
    this.ngOnInit();
  }

  acquista(){
    console.log("carrello: ",  this.elementiCarrello);
    this.cart.insertAcquisto(this.elementiCarrello);
  }

}
