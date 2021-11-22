import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Producto } from '../models/producto';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  producto:Producto = new Producto();
  url:string = environment.baseUrl
  constructor(private http:HttpClient){}

public getProductos(){
return this.http.get<Producto[]>(this.url+'Producto/consultar-producto')
}
 
}
