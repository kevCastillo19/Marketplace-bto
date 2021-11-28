import { Injectable } from '@angular/core';
import { Euro } from '../models/euro';
import { Bitcoin } from '../models/bitcoin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Conversion } from '../models/conversion';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  url: string = environment.baseUrl;
  euto: Euro = new Euro();

  constructor(private http: HttpClient, private usuarioService:UsuarioService) { }

  getEuro() {
    return this.http.get<Euro>(this.url + 'Conversion/consultar-euro')
  }
  getBitcoin() {
    return this.http.get<Bitcoin>(this.url + 'Conversion/consultar-bitcoin')
  }

  agregarConversion(conversion:Conversion){
    var token =JSON.parse( this.usuarioService.getToken('token')) ;
    //let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token });
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+token.token);
    return this.http.post<Conversion>(this.url+'Conversion/agregar-conversion', conversion, {headers: headers});
  }
}
