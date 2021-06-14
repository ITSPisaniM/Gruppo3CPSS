import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularCPSS';
  loginPage: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.location.path() === '/login') {
      this.loginPage = true;
    } else {
      this.loginPage = false;
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public login(): void {
    const expiresAt = moment().add(10000000, 'second');

    localStorage.setItem('id_token', 'authResult.idToken');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
