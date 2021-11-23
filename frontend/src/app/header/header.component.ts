import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private service: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  private getProductos() {
    this.service.getProductos().subscribe(res => {
      console.log(res)
      this.productos = res
    }, error => {
      console.log(error)
    })
  }
}
