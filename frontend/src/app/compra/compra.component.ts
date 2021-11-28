import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Venta } from '../models/venta';
import { CarritoService } from '../service/carrito.service';
import { UsuarioService } from '../service/usuario.service';
import { VentaService } from '../service/venta.service';
import { DetalleVenta } from '../models/detalleVenta';
import { Euro } from '../models/euro';
import { ConversionService } from '../service/conversion.service';
import { Bitcoin } from '../models/bitcoin';
import { Conversion } from '../models/conversion';

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
  conversion: Conversion = new Conversion();
  euro: Euro = new Euro();
  euroRate:number = 0;
  bitcoin: Bitcoin = new Bitcoin();
  bitcoinRate:number = 0;
  usuario:Usuario = new Usuario();
  venta:Venta = new Venta();
  detalleVenta:DetalleVenta=new DetalleVenta();
  totalG:number = 0;
  total:number = 0;


  constructor(public carritoService: CarritoService,
    private usuarioService: UsuarioService, private ventaService:VentaService, private conversionService: ConversionService) { }

  ngOnInit(): void {
    this.getCompraView();
    this.getCompraDB();
    this.getEuro();
    this.getBitcoin();
    for(let dt of this.views){
      this.total+=dt.total;
    }
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

  getEuro(): void {
    this.conversionService.getEuro().subscribe(res => {
      console.log(res)
      this.euro = res
      console.log(this.euro)
    }, error => {
      console.log(error)
    })
  }
  getBitcoin(): void {
    this.conversionService.getBitcoin().subscribe(res => {
      console.log(res)
      this.bitcoin = res
      console.log(this.bitcoin)
    }, error => {
      console.log(error)
    })
  }

  getCompraDB(){
    this.detalles = this.carritoService.compraDB;
    console.log(this.detalles)
  }


  registrarVenta(conversion:string){
    this.venta.fechaVenta= new Date();
    this.venta.idUsuario=this.usuario.idUsuario as number;
    this.venta.totalVenta=this.total;
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
        this.conversion.numVenta=res.id;
        this.conversion.tipoMoneda=conversion;
        if (conversion=="bitcoin") {
          this.bitcoinRate = this.total/this.bitcoin.rate_float;
          this.conversion.montoIngresado=this.bitcoinRate;
          this.conversion.valorMoneda=this.bitcoin.rate_float;
          this.conversionService.agregarConversion(this.conversion).subscribe((resConversion:any)=>{
            if (resConversion.status == 200) {
              console.log("se agregó conversion");
            } else {
              console.log("error conversion");
            }
          },
          (errorConversion:any)=>{
            console.log("No se agregó la conversion");
          })
        } else if (conversion=="euro") {
          this.euroRate = this.total*this.euro.conversion_rate;
          this.conversion.montoIngresado=this.euroRate;
          this.conversion.valorMoneda=this.euro.conversion_rate;
          this.conversionService.agregarConversion(this.conversion).subscribe((resConversion:any)=>{
            if (resConversion.status == 200) {
              console.log("se agregó conversion");
            } else {
              console.log("error conversion");
            }
          },
          (errorConversion:any)=>{
            console.log("No se agregó la conversion");
          })
        }
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
