import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/_models/models';
import { ProductsService } from 'src/app/_services/products/products.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class ProfileComponent implements OnInit {
  constructor(
    private _cookieService: CookieService,
    private _productService:ProductsService){}

  user!: User
  orders!: any;

  ngOnInit(): void {
      const cookieUser = this._cookieService.get('user');
      if(!cookieUser) return;
        this.user = JSON.parse(cookieUser)
        this._productService.getProductPerOrderPerUser()
          .subscribe({
            next: (orders: any) =>{
              this.orders = orders;
              console.log(orders);
            },
            error: (err)=>{
              console.log(err)
            }
          })
      
  }



  
}
