import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProdottoDaComprare } from '../prodotti/ProdottoDaComprare';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {

  carrello: string;

  elementiCarrello: ProdottoDaComprare[];

  constructor() { }

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

}
