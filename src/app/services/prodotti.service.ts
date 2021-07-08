import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  private rootI = 'prodotti/';

  constructor(private api: ApiService) {}

  public getProdotti(): Observable<any> {
    return this.api.get(this.rootI + 'list');
  }

  public getNumProdotti(): Observable<any> {
    return this.api.get(this.rootI + 'count');
  }

  public getProdottiPagination(index: number, size: number): Observable<any> {
    var params = new HttpParams()
      .set('page', index.toString())
      .set('size', size.toString());
    return this.api.get(this.rootI + 'page', params);
  }
}
