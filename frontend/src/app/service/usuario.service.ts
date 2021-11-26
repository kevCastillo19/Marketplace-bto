import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token:string="";
  user:Usuario = new Usuario();
  url:string = environment.baseUrl;
  constructor(private http:HttpClient){}

  login(usuario:any){
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url+'Usuario/login-usuario', params, {headers: headers});
  }

  registro(usuario:Usuario){
    var token =JSON.parse( this.getToken('token')) ;
    let params = JSON.stringify(usuario);
    console.log(params);
    //let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token });
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+token.token);
    return this.http.post<Usuario>(this.url+'Usuario/agregar-usuario', usuario, {headers: headers});
  }

  saveToken(key: string, token: string){
  
  try{
      localStorage.setItem(key, JSON.stringify(token));
  }catch(error){
      console.log("saveToken", error);
  }
}

getToken(key:string){
  try{
      return localStorage.getItem(key) as string;
  }catch(error){
    console.log("getToken", error);
  }
  return "";
}

userLogged(){
  console.log(this.getToken('token'));
  this.token = this.getToken('token') as string;
  var decoded = jwt_decode(this.token);
  console.log(decoded);
  return decoded;//Está así porque no funciona con notación de punto

}

getRole(){
  this.user = this.userLogged() as Usuario;
  console.log(this.user);
  return this.user.idRol;
}

userIsLogged(){
  if(this.getToken('token')){
        return true;
  }else{
     return false;
  }
}

logout(){
  localStorage.removeItem('token');
}

}
