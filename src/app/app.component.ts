import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularCPSS';
  public loginPage: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private location: Location,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.location.isCurrentPathEqualTo('/login')) {
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

  public logout(): void {
    this.loginPage = true;
    this.authService.logOut();
  }
}
