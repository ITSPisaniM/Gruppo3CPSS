import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private rootI = 'prodotti/'

  constructor(
    private api: ApiService,
    ) {}

  public getProdotti():Observable<any>{
    return this.api.get(this.rootI + 'list','');
  }

  public getNumProdotti():Observable<any>{
    return this.api.get(this.rootI + 'count','');
  }

  public getProdottiPagination(index:number, size:number): Observable<any> {
    return this.api.get(this.rootI + 'page?page=' + index + '&size=' + size , '');
  }
}
