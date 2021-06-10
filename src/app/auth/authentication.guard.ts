import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
//import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
 
  constructor(
    private router: Router, 
    //private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private log: LoginComponent
    ) { }

  canActivate(): boolean {
    // if(this.authService.isAuthenticated()){
    //   return true;
    // }
    // this.router.navigate(['/login'],{replaceUrl: true});
    
    // return false;

      return true;
  }
}   