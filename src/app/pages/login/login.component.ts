import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import {
  AuthenticationService,
  LoginContext,
} from 'src/app/auth/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLogged: boolean = false;
  messaggio: string;
  wrongLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private pp: AppComponent
  ) {}

  ngOnInit(): void {
    this.pp.loginPage = true;
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      var loginContext: LoginContext = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
      };
      this.auth.login(loginContext).subscribe(
        (res) => {
          this.router.navigate(['/ordini'], { replaceUrl: true });
          this.pp.loginPage = false;
        },
        (error) => {
          this.wrongLogin = true;
        }
      );
    } else {
      this.messaggio = 'Devi inserire username e password';
    }
  }
}
