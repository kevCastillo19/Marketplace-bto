import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-item-compra-user',
  templateUrl: './item-compra-user.component.html',
  styleUrls: ['./item-compra-user.component.css']
})
export class ItemCompraUserComponent implements OnInit {

  producto: Producto = new Producto();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.producto = JSON.parse(this.route.snapshot.params.producto);
  }

}
