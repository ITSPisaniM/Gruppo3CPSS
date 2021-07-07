import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdottoDaComprare } from '../pages/prodotti/ProdottoDaComprare';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  private rootI = 'acquisti/'

  constructor(
    private api: ApiService,
  ) { }

  public insertAcquisto(elementi:ProdottoDaComprare[]):Observable<any>{
    return this.api.post(this.rootI + 'save', elementi);
  }
}
