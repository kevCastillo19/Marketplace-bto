import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-agregar-producto-admin',
  templateUrl: './agregar-producto-admin.component.html',
  styleUrls: ['./agregar-producto-admin.component.css']
})
export class AgregarProductoAdminComponent implements OnInit {
  productos: Producto[] = [];
  productoForm = new FormGroup({
    nombreProducto: new FormControl(''),
    descProducto: new FormControl(''),
    precioProducto: new FormControl(''),
    stockProducto: new FormControl(''),
    idCategoria: new FormControl(''),
  })

  constructor(private service: ProductoService) { }

  ngOnInit(): void {

  }

  public agregarProducto() {
    this.service.agregarProducto(this.productoForm.value)
      .subscribe(res => {
        this.productos.push(res)
        this.productoForm.reset('');
      }, error => {
        console.log(error)
      });
  }


  
}
