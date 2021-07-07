import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from './auth/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { ProdottoDaComprare } from './pages/prodotti/ProdottoDaComprare';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularCPSS';
  public loginPage: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private location: Location,
    private authservice: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
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

  openCarrello(){
    this.dialog.open(CarrelloComponent);
  }

  private elDaComprare: ProdottoDaComprare[];
  getElDaComprare(value: any){
    console.log(value + "sa");
    
    this.elDaComprare.push(value);
  }
}
