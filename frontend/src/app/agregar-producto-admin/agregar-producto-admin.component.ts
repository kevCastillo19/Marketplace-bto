import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-agregar-producto-admin',
  templateUrl: './agregar-producto-admin.component.html',
  styleUrls: ['./agregar-producto-admin.component.css']
})
export class AgregarProductoAdminComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = new Producto();

  productoForm = new FormGroup({
    nombreProducto: new FormControl(''),
    descProducto: new FormControl(''),
    precioProducto: new FormControl(''),
    stockProducto: new FormControl(''),
    idCategoria: new FormControl(''),
  })

  categorias: Categoria[] = [];



  constructor(private service: ProductoService, private fb: FormBuilder, private ruta: Router) {

    this.productoForm = this.fb.group({
      nombreProducto: [''],
      descProducto: [''],
      precioProducto: [''],
      stockProducto: [''],
      idCategoria: ['']
    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.productoForm = this.fb.group({
      nombreProducto: [''],
      descProducto: [''],
      precioProducto: [''],
      stockProducto: [''],
      idCategoria: ['']
    });
  }

  private getCategorias(): void {
    this.service.getCategorias().subscribe(res => {
      console.log(res)
      this.categorias = res
    }, error => {
      console.log(error)
    })
  }

  public agregarProducto(obj: Producto) {
    //this.producto = this.productoForm
    this.producto = obj
    
    this.producto=this.productoForm.value as Producto;
    console.log(this.producto)
    this.service.agregarProducto(this.productoForm.value)
      .subscribe(res => {
        this.productos.push(res)
        this.productoForm.reset('');
        this.ruta.navigate(['agregar-imagen-admin', { producto: JSON.stringify(this.producto) }]);
      }, error => {
        console.log(error)
      });
  }



}
