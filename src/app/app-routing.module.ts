import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OrdiniComponent } from './pages/ordini/ordini.component';
//components for routing

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'ordini',
    component: OrdiniComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
