import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idRol:number=0;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.idRol = this.usuarioService.getRole();
  }

}
