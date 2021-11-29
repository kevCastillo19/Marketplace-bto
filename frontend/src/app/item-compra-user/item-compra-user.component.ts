import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { CarritoService } from '../service/carrito.service';
import { Valoracion } from '../models/valoracion';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import { ValoracionService } from "../service/valoracion.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-compra-user',
  templateUrl: './item-compra-user.component.html',
  styleUrls: ['./item-compra-user.component.css']
})
export class ItemCompraUserComponent implements OnInit {

  idRol:number=0;
  producto: Producto = new Producto();
  valoracion: Valoracion = new Valoracion();
  usuario:Usuario = new Usuario();

  constructor(private route: ActivatedRoute, public carritoService: CarritoService, private usuarioService: UsuarioService,
    private valoracionService: ValoracionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.idRol = this.usuarioService.getRole();
    this.producto = JSON.parse(this.route.snapshot.params.producto);
    this.usuario = this.usuarioService.userLogged() as Usuario;

    this.valoracion.idProducto = this.producto.idProducto;
    this.valoracion.idUsuario = this.usuario.idUsuario as number;
  }

  agregarCarrito(){
    this.carritoService.guardarProductoCarrito(this.producto);
  }

  registrarValoracion(valoracion:number){
    this.valoracion.calificacion=valoracion;

    this.valoracionService.agregarValoracion(this.valoracion).subscribe((response: any) => {
      if (response.status == 200) {
        this.showAuthorizedMessage("Gracias por valorar este producto", "Exito!");
      } else {
        this.showNotAuthorizedMessage(response.mensaje, "Error")
      }
    },
      (error: any) => {
        this.showNotAuthorizedMessage("Ocurrio un error en la valoracion del producto", "No se registró")
        console.log("Error: ", error);
      }
    );
  }

  showAuthorizedMessage(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo);
  }

  showNotAuthorizedMessage(mensaje: string, titulo: string) {
    this.toastr.error(mensaje, titulo);
  }

}
