import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Valoracion } from '../models/valoracion';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient, private usuarioService:UsuarioService) { }

  agregarValoracion(valoracion:Valoracion){
    var token =JSON.parse( this.usuarioService.getToken('token')) ;
    //let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token });
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+token.token);
    return this.http.post<Valoracion>(this.url+'Valoracion/agregar-valoracion', valoracion, {headers: headers});
  }
}
