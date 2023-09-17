import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddUpdateComponent } from './add-update/add-update.component';
import {MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatExpansionModule} from '@angular/material/expansion';
import { OrderComponent } from './orders/order/order.component';

@NgModule({
  declarations: [
  
    ProductsComponent,
       OrdersComponent,
       ProductCardComponent,
       AddUpdateComponent,
       OrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,

  ]
})
export class AdminModule { }
