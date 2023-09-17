import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { ShopComponent } from './shop/shop.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CookieService } from 'ngx-cookie-service';
import { CartComponent } from './cart/cart.component';
import { ProductCardComponent } from './shop/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { OrderComponent } from './profile/order/order.component';

@NgModule({
  declarations: [
    StoreComponent,
    ShopComponent,
    SingleProductComponent,
    CartComponent,
    ProductCardComponent,
    ProfileComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule
  ],
  exports:[
    StoreComponent,
    ProductCardComponent
  ],
  providers:
  [CookieService],
})
export class StoreModule { }
