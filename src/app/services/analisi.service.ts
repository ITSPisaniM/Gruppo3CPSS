import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AnalisiService {
  path: string = 'ordiniProdotti/analytics';

  constructor(private api: ApiService) {}

  public getTotQandR(startDate: string): Observable<any> {
    var params = new HttpParams().set('StartDate', startDate);
    return this.api.get(this.path, params);
  }

  public getTotQandRperItem(startDate: string, asin: string) {
    var params = new HttpParams()
      .set('StartDate', startDate)
      .set('ItemAsin', asin);
    return this.api.get(this.path, params);
  }
}
