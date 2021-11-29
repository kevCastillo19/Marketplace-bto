import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../models/categoria';
import { Imagen } from '../models/imagen';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-agregar-imagen-admin',
  templateUrl: './agregar-imagen-admin.component.html',
  styleUrls: ['./agregar-imagen-admin.component.css']
})
export class AgregarImagenAdminComponent implements OnInit {

  productos: Producto[] = [];
  imagen: Producto = new Producto();
  productoNew: Producto = new Producto();
  imagenForm = new FormGroup({

    nombreProducto: new FormControl(''),
    descProducto: new FormControl(''),
    precioProducto: new FormControl(''),
    stockProducto: new FormControl(''),
    idCategoria: new FormControl(''),
    idProducto: new FormControl('')
  })
  categorias: Categoria[] = [];
  fileImagen: File | null = null;

  constructor(private service: ProductoService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.imagen = JSON.parse(this.route.snapshot.params.producto);
    console.log(this.imagen);
  }

  public actualizarProducto() {
    this.service.updateProducto(this.imagenForm.value)
      .subscribe(res => {
        this.productos.push(res)
        this.imagenForm.reset('');
        console.log(res)
      }, error => {
        console.log(error)
      });
  }
  handleFileInput(event: any) {
    this.fileImagen = event.item(0);
    console.log(this.fileImagen?.name);
  }
  onFileSelected(event: any) {
    console.log(this.fileImagen?.name);
    this.fileImagen = event.target.files[0];
    if (this.fileImagen) {
//2 opciones, se puede convertir la iagen en base 64 y mandar el string con el id del producto o se puede mandar el archivo como tal como multipart forma data
    }
  }
}
