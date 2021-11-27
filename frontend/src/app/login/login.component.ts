import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioAgregar:FormGroup;
  usuario:Usuario = new Usuario();
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private toastr: ToastrService,
    private router: Router) {
    this.formularioAgregar=this.fb.group({
      correoUsuario:['',Validators.compose([Validators.required, Validators.email])],
      contrasena:['',Validators.compose([Validators.required,Validators.minLength(4)])]
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    this.formularioAgregar=this.fb.group({
      correoUsuario:['',Validators.compose([Validators.required, Validators.email])],
      contrasena:['',Validators.compose([Validators.required,Validators.minLength(4)])]
    });
  }

  login(){
    this.usuario=this.formularioAgregar.value as Usuario;
    console.log(this.usuario);
    this.usuarioService.login(this.usuario).subscribe(response => {
    this.usuarioService.saveToken('token',response as string);
      console.log(response);
      this.toastr.success('Hola!', 'Bienvenido a MarketPlace');
      console.log(this.usuarioService.getRole());
      this.router.navigate(['/productos']);
    },
    error => {
      console.log(error);
      this.toastr.error('Error!', 'Error al autenticar usuario');
    }
    );
  }

}
