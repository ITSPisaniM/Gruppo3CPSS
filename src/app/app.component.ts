import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from './auth/authentication.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  actualPage: string;
  title = 'AngularCPSS';
  public loginPage: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.actualPage = val.url;
      }
    });
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
