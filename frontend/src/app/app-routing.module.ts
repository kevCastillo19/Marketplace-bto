import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { AgregarImagenAdminComponent } from './agregar-imagen-admin/agregar-imagen-admin.component';
import { AgregarProductoAdminComponent } from './agregar-producto-admin/agregar-producto-admin.component';
import { HeaderComponent } from './header/header.component';
import { ItemCompraUserComponent } from './item-compra-user/item-compra-user.component';
import { LoginComponent } from './login/login.component';
import { MiBolsaUserComponent } from './mi-bolsa-user/mi-bolsa-user.component';
import { ProductosComponent } from './productos/productos.component';
import { RegisterComponent } from './register/register.component';
import { ProductoService } from './service/producto.service';
import { CompraComponent } from './compra/compra.component';



const routes: Routes = [
{
  path: '', redirectTo: 'login', pathMatch: 'full'
},

{
  path: '',component:LoginComponent
},
  {
    path: 'productos',component: ProductosComponent
  },
  {
    path: 'register',component: RegisterComponent
  },
  {
    path: 'agregar-producto-admin',component: AgregarProductoAdminComponent
  },
  {
    path: 'agregar-imagen-admin',component: AgregarImagenAdminComponent
  },
  {
    path: 'item-compra',component: ItemCompraUserComponent
  },
  {
    path: 'actualizar-producto',component: ActualizarProductoComponent
  },
  {
    path: 'mi-bolsa',component: MiBolsaUserComponent
  },
  {
    path: 'compra',component: CompraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
