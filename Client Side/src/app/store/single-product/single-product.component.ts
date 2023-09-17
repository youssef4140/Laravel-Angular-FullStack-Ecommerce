import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/_services/products/products.service';
import { Product } from 'src/app/_models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  id!: number;
  product!: Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    public _productService: ProductsService,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.getProductById()
    }
  }

  private getProductById() {
    this._productService.getProductById(this.id)
      .subscribe({
        next: (results) => {
          this.product = results;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

  increaseQuantity() {
    if (this.quantity < this.product.stock) {
      this.quantity++
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--

    }
  }

  purchase() {
    if(!this.cookieService.get('user')){
      this._snackBar.open(('You must log in to start buying!'), 'X', { duration: 4000 });
      return;
    }
    const productData = 
    {
      "product_id": this.id,
      "quantity": this.quantity
    }
    let cart = localStorage.getItem('cart');
    if(cart) {
      let cartparsed = JSON.parse(cart)
      const currentProductindex = cartparsed.findIndex((obj:any) => obj.product_id == this.id);
      console.log(currentProductindex)
      console.log(cartparsed)
      if(currentProductindex !== -1){
        cartparsed.splice(currentProductindex, 1, productData);
      } else{
        cartparsed.push(productData)
      }
      localStorage.setItem('cart', JSON.stringify(cartparsed))
    }else{
    localStorage.setItem('cart', JSON.stringify([productData]));
    }
    console.log(localStorage.getItem('cart'))
    this._snackBar.open(('Product added successfully! Please View in cart'),'X',{ duration: 2000 });

  }

}
