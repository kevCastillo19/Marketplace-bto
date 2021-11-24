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
      if (response.status == 200) {
        this.toastr.success("Exito!","Te has registrado exitosamente");
      }else{
        this.toastr.error("Error",response.mensaje);
      }
      this.formularioAgregar.reset();
    },
    error => {
      this.toastr.error("No se registró","Sucedió un problema al registrar usuario");
      console.log(error);
    }
    );

  }

}
