import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  productos: Producto[] = [];
  productoOld: Producto = new Producto();
  productoNew: Producto = new Producto();
  productoForm = new FormGroup({
  
    nombreProducto: new FormControl(''),
    descProducto: new FormControl(''),
    precioProducto: new FormControl(''),
    stockProducto: new FormControl(''),
    idCategoria: new FormControl(''),
    idProducto: new FormControl('')
  })
  categorias: Categoria[] = [];



  constructor(private service: ProductoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategorias();
    this.productoOld = JSON.parse(this.route.snapshot.params.producto);
    console.log(this.productoOld);
  }
  private getCategorias(): void {
    this.service.getCategorias().subscribe(res => {
      console.log(res)
      this.categorias = res
    }, error => {
      console.log(error)
    })
  }

  public actualizarProducto() {
    this.service.updateProducto(this.productoForm.value)
      .subscribe(res => {
        this.productos.push(res)
        this.productoForm.reset('');
      }, error => {
        console.log(error)
      });
  }


}
