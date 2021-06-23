import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OrdiniComponent } from './pages/ordini/ordini.component';
//components for routing
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './auth/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'ordini',
    component: OrdiniComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
