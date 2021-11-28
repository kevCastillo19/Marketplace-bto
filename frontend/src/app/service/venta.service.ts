import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Venta } from '../models/venta';
import { UsuarioService } from './usuario.service';
import { DetalleVenta } from '../models/detalleVenta';
import { Conversion } from '../models/conversion';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url:string = environment.baseUrl;
  constructor(private http:HttpClient, private usuarioService:UsuarioService) { }

  registroVenta(venta:Venta){
    var token =JSON.parse( this.usuarioService.getToken('token')) ;
    let params = JSON.stringify(venta);
    console.log(params);
    //let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token });
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+token.token);
    return this.http.post<Venta>(this.url+'Venta/agregar-venta', venta, {headers: headers});
  }

  registroDetalle(detalle: DetalleVenta){
    let params = JSON.stringify(detalle);
    console.log(params);
    return this.http.post<DetalleVenta>(this.url+'DetalleVenta/agregar-detalleventa', detalle);
  }

  registroConversion(conversion: Conversion){
    return this.http.post<Conversion>(this.url+'Conversion/agregar-conversion', conversion);
  }
}
