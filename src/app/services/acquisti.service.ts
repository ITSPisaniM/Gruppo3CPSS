import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AcquistiService {

  private rootI = 'acquisti/'

  constructor(
    private api: ApiService,
    ) {}

  public getAcquisti():Observable<any>{
    return this.api.get(this.rootI + 'list','');
  }

  public getNumAcquisti():Observable<any>{
    return this.api.get(this.rootI + 'count','');
  }

  public getAcquistiPagination(index:number, size:number): Observable<any> {
    return this.api.get(this.rootI + 'page?page=' + index + '&size=' + size , '');
  }

  public getByFilters(
    amazonOrderId: string,
    buyerEmail: string,
    purchaseDate: string
  ): Observable<any> {
    var params = new HttpParams()
      .set('amazonOrderId', amazonOrderId)
      .set('buyerEmail', buyerEmail)
      .set('purchaseDate', purchaseDate);
    return this.api.get(this.rootI, params);
  }
}
