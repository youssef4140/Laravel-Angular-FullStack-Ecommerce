import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { StoreModule } from './store/store.module';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminModule } from './admin/admin.module';
// import { ProductCardComponent } from './store/shop/product-card/product-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginRegisterComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    StoreModule,
    AdminModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
