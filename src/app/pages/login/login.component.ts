import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UtenzaService } from 'src/app/services/utenza.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private user: string = "";
  private pass: string = "";
  loginForm: FormGroup;
  isLogged: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    public utenzaService: UtenzaService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log("I SASSI SONO BUONI");    
    this.isLogged = true;
    window.sessionStorage.setItem("logged", "true");
    this.router.navigate(['']);


  }

  logout() {
    this.user = "";
    this.pass = "";
    this.isLogged = false;
    window.sessionStorage.clear();
  }
}
