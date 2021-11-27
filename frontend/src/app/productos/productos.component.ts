import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  idRol:number=0;
  productos: Producto[] = [];

  producto: Producto = new Producto();
  idProducto: number = 0;
  productoForm = new FormGroup({
    nombreProducto: new FormControl(''),
    descProducto: new FormControl(''),
    precioProducto: new FormControl(''),
    stockProducto: new FormControl(''),
    idCategoria: new FormControl(''),
  })
  categorias: Categoria[] = [];
  constructor(private service: ProductoService, private ruta: Router, private usuarioService:UsuarioService) { }


  ngOnInit(): void {
    this.idRol = this.usuarioService.getRole();
    this.getProductos();
    this.getCategorias();
  }

  private getProductos(): void {
    this.service.getProductos().subscribe(res => {
      console.log(res)
      this.productos = res
    }, error => {
      console.log(error)
    })
  }
  private getCategorias(): void {
    this.service.getCategorias().subscribe(res => {
      console.log(res)
      this.categorias = res
    }, error => {
      console.log(error)
    })
  }
  /*public updateProducto(Producto: any) {
    this.service.updateProducto(Producto).subscribe(res => {
     const {nombreProducto,descProducto,precioProducto, stockProducto,idCategoria,idProducto} = res;
      console.log(res)
     this.idProducto = Producto || 0;
    this.productoForm.setValue({nombreProducto,descProducto,
     precioProducto, stockProducto,idCategoria})

     this.ruta.navigate(['actualizar-producto',{producto:JSON.stringify(Producto)}]);
    }, error => {
      console.log(error)
    })
  }*/

  updateProducto(obj: Producto) {
    this.producto = obj
    this.ruta.navigate(['actualizar-producto', { producto: JSON.stringify(this.producto) }]);
  }

  eliminarProducto(idProducto: number) {
    this.service.deleteProducto(idProducto).subscribe(res => {
      console.log(res)
    })
  }

  public verProducto(productoP: Producto){
    this.producto = productoP;
    this.ruta.navigate(['item-compra',{producto:JSON.stringify(productoP)}]);
  }
}
