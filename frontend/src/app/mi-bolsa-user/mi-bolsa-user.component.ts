import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../service/carrito.service';
import { Producto } from '../models/producto';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-bolsa-user',
  templateUrl: './mi-bolsa-user.component.html',
  styleUrls: ['./mi-bolsa-user.component.css']
})
export class MiBolsaUserComponent implements OnInit {

  productos: Producto[] = [];
  total:number = 0;
  precioUniTotal:number = 0;
  stockForm: FormGroup;
  detalles:any[] =[];
  compraDB:any[] = [];
  compraView:any[] = [];
  constructor(public carritoService: CarritoService, public ruta: Router,private fb: FormBuilder) {

    this.stockForm = this.fb.group({
      stockProducto: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
     
    })
  }

  ngOnInit(): void {
    this.getCarrito();
    this.precioTotal();
    this.stockForm = this.fb.group({
      stockProducto: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
     
    })
  }

  getCarrito(){
    this.productos = this.carritoService.carritoLocalStorage;
  }

  public precioTotal(){
    this.total = 0;
    this.productos.forEach(element => {
      this.total += element.precioProducto;
      this.detalles.push({
        idProducto:element.idProducto,
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

  comprar(){
    this.detalles.forEach((element, index) => {
      this.compraDB.push({
        idProducto:element.idProducto,
        cantidad:element.cant,
        total:element.total,
      })
      this.compraView.push({
        nombreProducto:element.nombreProducto,
        precio:element.precio,
        cantidad:element.cant,
        total:element.total,
      })
    });
    this.carritoService.guardarCompraDB(this.compraDB);
    this.carritoService.guardarCompraView(this.compraView);
    this.ruta.navigate(['compra']);
  }
}
