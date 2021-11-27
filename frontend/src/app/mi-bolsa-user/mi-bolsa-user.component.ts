import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../service/carrito.service';
import { Producto } from '../models/producto';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-mi-bolsa-user',
  templateUrl: './mi-bolsa-user.component.html',
  styleUrls: ['./mi-bolsa-user.component.css']
})
export class MiBolsaUserComponent implements OnInit {

  productos: Producto[] = [];
  total:number = 0;
  precioUniTotal:number = 0;
  //cant:number = 0;
  detalles:any[] =[];
  constructor(public carritoService: CarritoService) {
  }

  ngOnInit(): void {
    this.getCarrito();
    this.precioTotal();
  }

  getCarrito(){
    this.productos = this.carritoService.carritoLocalStorage;
  }

  public precioTotal(){
    this.total = 0;
    this.productos.forEach(element => {
      this.total += element.precioProducto;
      this.detalles.push({
        nombreProducto:element.nombreProducto,
        desProducto:element.descProducto,
        precio:element.precioProducto,
        stock:element.stockProducto,
        total:0,
        cant:0
      });
    });
    this.total
  }

  borrarProductoCarrito(idProductoP:number){
    this.carritoService.borrarProducto(idProductoP);
    this.getCarrito();
  }

  calcularTotal(event:any,precio:any,i:any){
    console.log(event, this.precioUniTotal,i);
    this.detalles[i].total = event * precio;
    console.log(this.detalles);
  }

}
