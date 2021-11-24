import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formularioAgregar:FormGroup;
  usuario:Usuario = new Usuario();
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private toastr: ToastrService,
    private router: Router) { 
    this.formularioAgregar=this.fb.group({
      nombreUsuario:['',Validators.required],
      correoUsuario:['',Validators.compose([Validators.required, Validators.email])],
      contrasena:['',Validators.compose([Validators.required,Validators.minLength(4)])],
      telefonoUsuario:['',Validators.required],
      direccion:['',Validators.required]
    });
  }
  ngOnInit(): void {
    this.formularioAgregar=this.fb.group({
      nombreUsuario:['',Validators.required],
      correoUsuario:['',Validators.compose([Validators.required, Validators.email])],
      contrasena:['',Validators.compose([Validators.required,Validators.minLength(4)])],
      telefonoUsuario:['',Validators.required],
      direccion:['',Validators.required]
    });
  }

  registrar(){
    
    this.usuario=this.formularioAgregar.value as Usuario;
    this.usuario.idRol=2;
    console.log(this.usuario);

    this.usuarioService.registro(this.usuario).subscribe((response:any) => {
      console.log(response);
      if (response.status == 200) {this.showAuthorizedMessage("Te has registrado exitosamente","Exito!");
      }else{
        this.showNotAuthorizedMessage(response.mensaje,"Error")
      }
      this.formularioAgregar.reset();
    },
    error => {
      this.showNotAuthorizedMessage("Sucedió un problema al registrar usuario","No se registró")
      console.log(error);
    }
    );

  }

  showAuthorizedMessage(mensaje: string, titulo: string){
    this.toastr.success(mensaje, titulo);
  }

  showNotAuthorizedMessage(mensaje: string, titulo: string){
    this.toastr.error(mensaje, titulo);
  }

}
