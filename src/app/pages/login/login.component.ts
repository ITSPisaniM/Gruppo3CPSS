import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private user: string = "";
  private pass: string = "";
  loginForm: FormGroup;
  isLogged:boolean = false;
  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  login(){
    this.user = this.loginForm.controls.username.value
    this.pass = this.loginForm.controls.password.value
    this.isLogged = true;
    this.router.navigate(['']);
  }

  logout(){
    this.user = "";
    this.pass = "";
    this.isLogged=false;
  }
}
