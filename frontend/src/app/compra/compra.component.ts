import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Venta } from '../models/venta';
import { CarritoService } from '../service/carrito.service';
import { UsuarioService } from '../service/usuario.service';
import { VentaService } from '../service/venta.service';
import { DetalleVenta } from '../models/detalleVenta';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  views: any[] = [];
  detalles: any[] = [{
    numVenta: 0,
    idProducto: 0,
    cantidad: 0,
    total: 0,
  }];
  usuario:Usuario = new Usuario();
  venta:Venta = new Venta();
  detalleVenta:DetalleVenta=new DetalleVenta();
  totalG:number = 0;
  constructor(public carritoService: CarritoService,
    private usuarioService: UsuarioService, private ventaService:VentaService) { }

  ngOnInit(): void {
    this.getCompraView();
    this.getCompraDB();
    this.usuario = this.usuarioService.userLogged() as Usuario;
  }

  getCompraView(){
    this.views = this.carritoService.compraView;
    console.log(this.views);
    let total:number = 0;
    for(let dt of this.views){
      console.log(dt);
      total+=dt.total;
    }
    this.totalG = total;
  }
  getCompraDB(){
    this.detalles = this.carritoService.compraDB;
    console.log(this.detalles)
  }

  registrarVenta(){
    let total:number = 0;
    for(let dt of this.views){
      total+=dt.total;
    }
    this.venta.fechaVenta= new Date();
    this.venta.idUsuario=this.usuario.idUsuario as number;
    this.venta.totalVenta=total;
    console.log(this.venta);
    this.ventaService.registroVenta(this.venta).subscribe((res:any)=>{
      if (res.status == 200) {
        this.detalleVenta.numVenta = res.id;
        this.detalles.forEach(detalle=>{
          this.detalleVenta.idProducto = detalle.idProducto;
          this.detalleVenta.cantidadProducto = detalle.cantidad;
          this.detalleVenta.total = detalle.total;
          console.log(this.detalleVenta);
          this.ventaService.registroDetalle(this.detalleVenta).subscribe((resDetalle:any)=>{
            if (resDetalle.status == 200) {
              console.log("se agregó detalle");
            } else {
              console.log("error detalle");
            }
          },
          (errorDetalle:any)=>{
            console.log("No se agregó detalle venta");
          }
          );
        });
      } else {
        console.log("error venta");
      }
    },
    (error:any)=>{
      console.log("No se agregó Venta ",error);
    }
    );
  }

}
