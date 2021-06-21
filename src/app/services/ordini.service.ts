import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrdiniService {
  constructor(private api: ApiService) {}

  public getOrdini(): Observable<any> {
    return this.api.get('api/ordini/list', '');
  }
}
