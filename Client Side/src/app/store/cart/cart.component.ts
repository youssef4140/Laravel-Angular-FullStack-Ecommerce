import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/_models/models';
import { ProductsService } from 'src/app/_services/products/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
interface ProductWithQuantity {
  product: Product,
  quantity: number
    
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private _productsService: ProductsService,
    private _snackBar: MatSnackBar
    ){

  }
 

  cartItems = localStorage.getItem('cart') || null;
  products: ProductWithQuantity[] = [];
  eventTimeOut:any = undefined;

  ngOnInit(): void {
    if (this.cartItems){
      const items = JSON.parse(this.cartItems)
      for (let i = 0; i < items.length; i++) {
        this._productsService.getProductById(items[i].product_id)
        .subscribe({
          next:(product) =>{
          this.products.push({
            "product":product,
            "quantity":items[i].quantity,
          });
          this.calculateTotalPrice()

        },
        error:(err)=> console.log(err)
        })


      }
      console.log(this.products);
    }


      
  }

  incrementQuantity(product:ProductWithQuantity){
    if(product.quantity < product.product.stock){
      product.quantity++
      this.totalPrice+= parseInt(product.product.price)
    }
    



  }

  reAssignQuantity(product:ProductWithQuantity, event: any){
    clearTimeout(this.eventTimeOut)
    if(product.quantity < product.product.stock && product.quantity > 1){
      product.quantity = event.target.value
      this.calculateTotalPrice()      
    }else if (event.target.value > product.product.stock ){
      this.eventTimeOut = setTimeout(() => {
      product.quantity = product.product.stock
      this.calculateTotalPrice()
      }, 1000);
    } else if (event.target.value < 1){
    clearTimeout(this.eventTimeOut)
      setTimeout(() => {
        product.quantity = 1
        this.calculateTotalPrice()
        }, 3000);
    }


  }
  decrementQuantity(product:ProductWithQuantity){
    if (product.quantity > 1) {
      product.quantity--
      this.totalPrice-= parseInt(product.product.price)

    }

  }

  deleteProduct(product:ProductWithQuantity){
    let index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.calculateTotalPrice()

    }
  }

  parseFloatPrice(price: string){
    return parseFloat(price);
  }

  totalPrice: number = 0;


calculateTotalPrice() {
  this.totalPrice = 0;
  for (const product of this.products) {
    const subtotal = parseFloat(product.product.price) * product.quantity;
    this.totalPrice += subtotal;
  }
}
checkout(){
  let cartItems = [];
  for(let product of this.products) {
    cartItems.push({
      product_id:product.product.id,
      quantity:product.quantity
    })
  }
  console.log(cartItems);
  if(!cartItems.length){
    this._snackBar.open(('Cart is empty!'),'X',{duration:2000})
    return;

  }
  this._productsService.postOrder(cartItems)
  .subscribe({
    next:(result)=>{
      if(result.length){
        this._snackBar.open(('Order Submitted successfully, please follow the order status from your profile'),'X',{duration:6000})
      }
    },
    error:(error)=>{
      console.log(error);
    },
    complete:()=>{
      this.products = [];
      this.totalPrice = 0;
      localStorage.removeItem('cart');
    }
  })

}


}
