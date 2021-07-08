import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdottoDaComprare } from '../models/ProdottoDaComprare';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AcquistiService {
  private rootI = 'acquisti/';

  constructor(private api: ApiService) {}

  public getAcquisti(): Observable<any> {
    return this.api.get(this.rootI + 'list', '');
  }

  public getNumAcquisti(): Observable<any> {
    return this.api.get(this.rootI + 'count', '');
  }

  public getAcquistiPagination(index: number, size: number): Observable<any> {
    var params = new HttpParams()
      .set('page', index.toString())
      .set('size', size.toString())
      .set('sort', 'purchaseId,DESC');
    return this.api.get(this.rootI + 'page', params);
  }

  public insertAcquisto(carrello: any): Observable<any> {
    console.log(this.rootI + 'save', carrello);

    return this.api.post(this.rootI + 'save', carrello);
  }

  public getByFilters(
    amazonOrderId: string,
    buyerEmail: string,
    purchaseDate: string
  ): Observable<any> {
    var params = new HttpParams()
      .set('amazonOrderId', amazonOrderId)
      .set('buyerEmail', buyerEmail)
      .set('purchaseDate', purchaseDate)
      .set('sort', 'purchaseId,DESC');
    return this.api.get(this.rootI + 'filter', params);
  }
}
