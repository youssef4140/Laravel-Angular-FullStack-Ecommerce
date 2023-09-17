import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent, },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule { }
