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

  elementiCarrello: ProdottoDaComprare[];

  constructor(
    private cart: CarrelloService,
  ) { }

  ngOnInit(): void {
    this.getCarrello();
  }

  getCarrello(){
    this.elementiCarrello = JSON.parse(window.localStorage.getItem("carrello"));
  }
  svuota(){
    window.localStorage.removeItem("carrello");
    this.elementiCarrello = [];
    this.ngOnInit();
  }

  acquista(){
    console.log("carrello: ",  this.elementiCarrello);
    this.cart.insertAcquisto(this.elementiCarrello);
  }

}
