import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { ProdottoDaComprare } from './models/ProdottoDaComprare';
import { ProdottiService } from './services/prodotti.service';
import { Notifica } from './models/notifica';
import { NotificheComponent } from './pages/notifiche/notifiche.component';
import { map, shareReplay } from 'rxjs/operators';
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
    private prod: ProdottiService,
    private authservice: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    //controllo giacenze
    this.controlloGiacenze();
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
    this.authservice.logOut();
  }

  openCarrello() {
    this.dialog.open(CarrelloComponent);
  }

  private elDaComprare: ProdottoDaComprare[];
  getElDaComprare(value: any) {
    console.log(value + 'sa');

    this.elDaComprare.push(value);
  }

  notifiche: Notifica[] = [];
  controlloGiacenze() {
    this.prod.getProdotti().subscribe((res) => {
      res.data.forEach((element) => {
        if (element.stock <= element.giacenzaMinima) {
          this.notifiche.push({
            asin: element.asin,
            title: element.title,
            qta: element.stock,
          });
        }
      });

      console.log('notifiche: ', this.notifiche);
    });
  }

  openNotifiche(): void {
    this.dialog.open(NotificheComponent, {
      data: this.notifiche,
    });
  }
}
