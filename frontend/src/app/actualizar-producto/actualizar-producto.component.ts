import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
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

  public getProducto(id: any) {
    this.service.getProducto(id).subscribe(res => {
      console.log(res)
    }, error => {
      console.log(error)
    })
  }

}
