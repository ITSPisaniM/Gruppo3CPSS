import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './pages/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './auth/authentication.guard';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './auth/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGuard } from './auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { ProdottiComponent } from './pages/prodotti/prodotti.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { PaginatorComponent } from '../shared/paginator/paginator.component';

import {PaginatorModule} from 'primeng/paginator';
import { DettaglioComponent } from './pages/prodotti/dettaglio/dettaglio.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [AppComponent, LoginComponent, ProdottiComponent, PaginatorComponent, DettaglioComponent, CarrelloComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatFormFieldModule,
    PaginatorModule,
    MatDialogModule,
    ScrollingModule,
  ],
  providers: [
    ApiService,
    AuthenticationGuard,
    AuthenticationService,
    AuthGuard,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
