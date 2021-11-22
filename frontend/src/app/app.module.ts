import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AgregarProductoAdminComponent } from './agregar-producto-admin/agregar-producto-admin.component';
import { AgregarImagenAdminComponent } from './agregar-imagen-admin/agregar-imagen-admin.component';
import { ItemCompraUserComponent } from './item-compra-user/item-compra-user.component';
import { MiBolsaUserComponent } from './mi-bolsa-user/mi-bolsa-user.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AgregarProductoAdminComponent,
    AgregarImagenAdminComponent,
    ItemCompraUserComponent,
    MiBolsaUserComponent,
    ActualizarProductoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
