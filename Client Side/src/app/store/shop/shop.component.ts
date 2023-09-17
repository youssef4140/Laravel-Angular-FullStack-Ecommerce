import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/models';
import { ProductsService } from 'src/app/_services/products/products.service'
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  constructor(private _productsService: ProductsService){}

  products: Product[] = [];
  page: number = 1;
  total!: number;
  perPage!: number;
  numberOfPages!: number;

  ngOnInit(): void {
    this.getProductsByPage()

  }
  getProductsByPage() {
    this._productsService.getProducts(this.page)
    .subscribe({
      next: (results) => {
        this.products = results.data;
        this.total = results.total;
        this.perPage = results.per_page;
        this.numberOfPages = Math.ceil(results.total/results.per_page)

      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  nextPage(){
    if (this.page < this.numberOfPages) 
    {
      this.page++;
      this.getProductsByPage()
      this.products.length
    }

  }

  lastPage(){
    if(this.page > 1)
    {
      this.page--;
      this.getProductsByPage()
      this.products.length
    };


  }
      
}