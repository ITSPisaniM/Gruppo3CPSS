import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public IdVisualizza:any=0;
  public ControlloAdmin:any=0;
  public Ruolo:any="responsabile";
  public Nome:any="";
 
  public path: string = "utente";
 
  constructor(public api: ApiService) {}
 
  public GetIdVisualizza() {
    return this.IdVisualizza;
  }
 
  public SetIdVisualizza(num:any) {
    this.IdVisualizza=num;
  }
 
  public GetControllo() {
    return this.ControlloAdmin;
  }
 
  public SetControllo(nome:any) {
    this.ControlloAdmin=nome;
  }
 
  public GetNome() {
    return this.Nome;
  }
 
  public SetNome(nome:any) {
    this.Nome=nome;
  }
 
  public GetRuolo() {
    return this.Ruolo;
  }
 
  public SetRuolo(nome:any) {
    this.Ruolo=nome;
  }
  
  public LoginToken(body:any) {
    return this.api.post(this.path + "/login/", body);
  }
  public Nominativo(id:any) {
    return this.api.get(this.path + "/nominativo/"+ id, null);
  }
  public Profilo(id:any) {
    return this.api.get(this.path + "/getprofilo/"+ id, null);
  }
}
