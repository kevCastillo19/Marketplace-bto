import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../service/carrito.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-mi-bolsa-user',
  templateUrl: './mi-bolsa-user.component.html',
  styleUrls: ['./mi-bolsa-user.component.css']
})
export class MiBolsaUserComponent implements OnInit {

  productos: Producto[] = [];
  total:number = 0;

  constructor(public carritoService: CarritoService) { }

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(){
    this.productos = this.carritoService.carritoLocalStorage;
  }

  public precioTotal(){
    this.productos.forEach(element => {
      this.total += element.precioProducto;
    });
    return this.total
  }

  borrarProductoCarrito(idProductoP:number){
    this.carritoService.borrarProducto(idProductoP);
    this.getCarrito();
  }

}
