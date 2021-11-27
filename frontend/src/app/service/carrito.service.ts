import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  find: number = 0;
  indice:number = -1;

  constructor() { }

  guardarProductoCarrito(producto: Producto) {
    let productos: Producto[] = this.carritoLocalStorage;

    productos.forEach(element => {
        if (element.idProducto == producto.idProducto) {
          this.find++;
        }
    });

    if (this.find != 0) {
      alert('El producto ya se encuentra en el carrito')
    } else {
      productos.push(producto);
      alert('El producto se agrego al carrito')
    }

    localStorage.setItem('carrito', JSON.stringify(productos))
  }

  borrarProducto(idProductoP:number){
    let productos: Producto[] = this.carritoLocalStorage;
    productos.forEach((element, index) => {
      if (element.idProducto == idProductoP) {
        this.indice = index
      }
    })

    productos.splice(this.indice, 1);
    localStorage.setItem('carrito', JSON.stringify(productos));
  }

  get carritoLocalStorage(): Producto[] {
    let getCarrito: Producto[] = JSON.parse(localStorage.getItem('carrito') || 'null');
    if(getCarrito == null){
      return new Array<Producto>();
    }
    return getCarrito;
  }
}
