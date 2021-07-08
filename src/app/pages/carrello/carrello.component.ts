import { Component, OnInit } from '@angular/core';
import { AcquistiService } from 'src/app/services/acquisti.service';
import { ProdottoDaComprare } from '../../models/ProdottoDaComprare';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {

  elementiCarrello: ProdottoDaComprare[];

  constructor(
    private cart: AcquistiService
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

  togli(id: string){
    let index = this.elementiCarrello.find(k => k.prodotto.asin == id);

    this.elementiCarrello.splice(this.elementiCarrello.indexOf(index), 1);

    window.localStorage.setItem("carrello", JSON.stringify(this.elementiCarrello));
  }

  acquista(){
    console.log("carrello: ", JSON.stringify({
      prodotto: this.elementiCarrello 
    }));

    this.cart.insertAcquisto({prodotto: this.elementiCarrello}).subscribe(res => {
      console.log("res: ", res);
    });
  }

}
