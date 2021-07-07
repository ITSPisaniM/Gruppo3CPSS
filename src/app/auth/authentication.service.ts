import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CookieService } from 'ngx-cookie-service';

export interface Credentials {
  // Customize received credentials here
  // username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
}

const credentialsKey = 'jwt';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private path: string = 'utente';

  public token: boolean = false;

  private _credentials: string;

  constructor(
    private router: Router,
    public api: ApiService,
    private cookie: CookieService
  ) {
    this._credentials = sessionStorage.getItem(credentialsKey);
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    return this.api.post(this.path + '/login', context);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */

  logOut(): void {
    this.cookie.delete('token');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */

  isAuthenticated(): boolean {
    try {
      if (this.cookie.check('token')) {
        this.token = true;
      } else {
        this.token = false;
      }
      return this.token;
    } catch (e) {
      return false;
    }
  }

  setAuthenticated(): boolean {
    try {
      this.token = true;
      return this.token;
    } catch (e) {
      return false;
    }
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): string {
    return this._credentials;
  }
}
