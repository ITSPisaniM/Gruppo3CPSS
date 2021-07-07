import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonsService {
  // Fix per le date da inviare al database
  public fixDate(dateToFix: string): string {
    var date = new Date(dateToFix);
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

    return date.toISOString().split('T')[0];
  }
}
