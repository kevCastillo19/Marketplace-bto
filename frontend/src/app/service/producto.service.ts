import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../models/producto';
import { environment } from '../../environments/environment'
import { Categoria } from '../models/categoria';
import { Imagen } from '../models/imagen';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  producto: Producto = new Producto();
  url: string = environment.baseUrl;
  constructor(private http: HttpClient, private usuarioService:UsuarioService) { }

  getProductos() {
    return this.http.get<Producto[]>(this.url + 'Producto/consultar-producto')
  }
  getProductosCategoria(idCategoria:number) {
    return this.http.get<Producto[]>(this.url + 'Producto/consultar-productoCategoria/'+idCategoria)
  }

  getCategorias() {
    return this.http.get<Categoria[]>(this.url + 'Categoria/consultar-categoria')
  }
  public agregarProducto(obj: Producto) {
    console.log("service",obj);
    var token =JSON.parse( this.usuarioService.getToken('token')) ;
    let headers = new HttpHeaders().set('Authorization', 'Bearer '+token.token);
    return this.http.post<Producto>(this.url + 'Producto/agregar-producto', obj, {headers: headers});
  }
  public updateProducto(obj: Producto) {
    return this.http.put<Producto>(this.url + 'Producto/actualizar-producto/', obj)
  }
  public deleteProducto(idProducto:number){
    return this.http.delete<any>(this.url+`Producto/eliminar-producto/${idProducto}` )
  }
  public agregarImagen(obj: Producto){
    return this.http.post<Imagen>(this.url + 'Imagen/agregar-imagen', obj);
  }
}
