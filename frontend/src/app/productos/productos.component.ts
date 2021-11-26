import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  producto: Producto = new Producto();
  idProducto:number=0;
  productoForm = new FormGroup({
    nombreProducto: new FormControl(''),
    descProducto: new FormControl(''),
    precioProducto: new FormControl(''),
    stockProducto: new FormControl(''),
    idCategoria: new FormControl(''),
  })

  constructor(private service: ProductoService, private ruta: Router) { }

  ngOnInit(): void {
    this.getProductos();
  }

  private getProductos():void {
    this.service.getProductos().subscribe(res => {
      console.log(res)
      this.productos = res
    }, error => {
      console.log(error)
    })
  }

  public getProducto(idProducto: any) {
    this.service.getProducto(idProducto).subscribe(res => {
     const {idProducto, nombreProducto,descProducto,precioProducto, stockProducto,idCategoria} = res;

      this.idProducto = idProducto || 0;
      this.productoForm.setValue({nombreProducto,descProducto,
        precioProducto, stockProducto,idCategoria})
    }, error => {
      console.log(error)
    })
  }

  public verProducto(productoP: Producto){
    this.producto = productoP;
    this.ruta.navigate(['item-compra',{producto:JSON.stringify(productoP)}]);
  }
}
