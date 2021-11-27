import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-agregar-producto-admin',
  templateUrl: './agregar-producto-admin.component.html',
  styleUrls: ['./agregar-producto-admin.component.css']
})
export class AgregarProductoAdminComponent implements OnInit {
  /*productos: Producto[] = [];
  producto: Producto = new Producto();

  productoForm = new FormGroup({
    nombreProducto: new FormControl(''),
    descProducto: new FormControl(''),
    precioProducto: new FormControl(''),
    stockProducto: new FormControl(''),
    idCategoria: new FormControl(''),
  })
*/productos: Producto[] = [];
  categorias: Categoria[] = [];

  productoForm: FormGroup;
  producto: Producto = new Producto();


  constructor(private service: ProductoService, private fb: FormBuilder, private toastr: ToastrService, private ruta: Router) {

    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      descProducto: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      precioProducto: ['', Validators.required],
      stockProducto: ['', Validators.required],
      idCategoria: ['', Validators.required],
    })

    /*this.productoForm = this.fb.group({
      nombreProducto: [''],
      descProducto: [''],
      precioProducto: [''],
      stockProducto: [''],
      idCategoria: ['']
    });
  */
  }

  ngOnInit(): void {
    this.getCategorias();
    /*  this.productoForm = this.fb.group({
      nombreProducto: [''],
      descProducto: [''],
      precioProducto: [''],
      stockProducto: [''],
      idCategoria: ['']
    });*/
    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      descProducto: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      precioProducto: ['', Validators.required],
      stockProducto: ['', Validators.required],
      idCategoria: ['', Validators.required],
    })

  }

  private getCategorias(): void {
    this.service.getCategorias().subscribe(res => {
      console.log(res)
      this.categorias = res
    }, error => {
      console.log(error)
    })
  }

  public agregarProducto(obj: Producto) {
    //this.producto = this.productoForm
    this.producto = obj

    this.producto = this.productoForm.value as Producto;
    console.log(this.producto)
    this.service.agregarProducto(this.producto).subscribe((response: any) => {
      console.log(response.id);
      if (response.status == 200) {
        this.showAuthorizedMessage("Producto agregado exitosamente", "Exito!");
        this.ruta.navigate(['agregar-imagen-admin', { producto: JSON.stringify(this.producto) }]);

      } else {
        this.showNotAuthorizedMessage(response.mensaje, "Error")
      }
      this.productoForm.reset();

    },
      (error: any) => {
        this.showNotAuthorizedMessage("Sucedió un problema al ingresar el producto", "No se registró")
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
