import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { CarritoService } from '../service/carrito.service';

@Component({
  selector: 'app-item-compra-user',
  templateUrl: './item-compra-user.component.html',
  styleUrls: ['./item-compra-user.component.css']
})
export class ItemCompraUserComponent implements OnInit {

  producto: Producto = new Producto();

  constructor(private route: ActivatedRoute, public carritoService: CarritoService) { }

  ngOnInit(): void {
    this.producto = JSON.parse(this.route.snapshot.params.producto);
  }

  agregarCarrito(){
    this.carritoService.guardarProductoCarrito(this.producto);
  }

}
