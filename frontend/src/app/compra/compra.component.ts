import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../service/carrito.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  views: any[] = [];
  detalles: any[] = [];

  constructor(public carritoService: CarritoService) { }

  ngOnInit(): void {
    this.getCompraView();
    this.getCompraDB();
  }

  getCompraView(){
    this.views = this.carritoService.compraView;
    console.log(this.views);

  }
  getCompraDB(){
    this.detalles = this.carritoService.compraDB;
    console.log(this.detalles)

  }

}
