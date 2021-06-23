import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  constructor(
    private api: ApiService,
    ) {}

  

  public getProdotti():Observable<any>{
    return this.api.get('prodotti/list','');
  }

  public getProdottiPagination(): Observable<any> {
    return this.api.get('prodotti/page/0/5', '');
  }
}
