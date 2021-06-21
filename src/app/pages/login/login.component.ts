import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UtenzaService } from 'src/app/services/utenza.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLogged: boolean = false;
  messaggio: string;

  user = new FormControl('', [Validators.required]);
  pass = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public utenzaService: UtenzaService,
    public pp: AppComponent
  ) { }

  ngOnInit(): void {
    this.pp.loginPage = true;

    this.loginForm = this.fb.group({
      username: this.user,
      password: this.pass
    });
  }

  login() {
    //if (this.loginForm.controls.user.get) {
      this.isLogged = true;
      window.sessionStorage.setItem("logged", "true");
      this.pp.loginPage = false;
      this.router.navigate(['/dash'], { replaceUrl: true });
    //}else{
     //this.messaggio = "Devi inserire username e password"
      //console.log(this.loginForm.controls[this.user.])
    //}

  }

  logout() {
    this.isLogged = false;
    window.sessionStorage.clear();
  }
}
