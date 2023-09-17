import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { Product } from 'src/app/_models/models';
import { ProductsService } from 'src/app/_services/products/products.service';
import { AddUpdateComponent } from '../add-update/add-update.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },

})
export class ProductsComponent {


  constructor(
    private _productsService: ProductsService,
    private _adminService: AdminService,
    private _eref: ElementRef,
    private _renderer: Renderer2,
    private dialog: MatDialog
  ) { }

  products: Product[] = [];
  page: number = 1;
  total!: number;
  perPage!: number;
  numberOfPages!: number;
  checkedProducts: Set<number> = new Set();
  searchInput: string = '';
  searchResult!: any;
  @ViewChild('searchBox') searchBox!: ElementRef;

  ngOnInit(): void {
    this.getProductsByPage()

  }
  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.closeSearchBox();
    }
  }
  closeSearchBox() {
    const searchBoxIsVisible = this.searchBox.nativeElement.classList.contains('show');
    if (searchBoxIsVisible) {
      this._renderer.removeClass(this.searchBox.nativeElement, 'show');
    }
  }
  search() {
    this._productsService.searchProducts(this.searchInput)
      .subscribe({
        next: (results) => {
          this.searchResult = results;
          if (this.searchResult) {
            this._renderer.addClass(this.searchBox.nativeElement, 'show');

          }
          console.log(this.searchResult);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.searchInput = '';
        },
      });
  }

  getProductsByPage() {
    this._productsService.getProducts(this.page)
      .subscribe({
        next: (results) => {
          this.products = results.data;
          this.total = results.total;
          this.perPage = results.per_page;
          this.numberOfPages = Math.ceil(results.total / results.per_page)

        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

  nextPage() {
    if (this.page < this.numberOfPages) {
      this.page++;
      this.getProductsByPage()
      this.products.length
    }

  }

  lastPage() {
    if (this.page > 1) {
      this.page--;
      this.getProductsByPage()
      this.products.length
    };
  }


  deleteProduct(id: number) {
    console.log(id);
    this._adminService.deleteProductById(id)
      .subscribe({
        next: (result) => {
          if (result) {
            this.spliceProduct(id)
          }

        },
        error: (err) => {
          console.error(err);
        }
      })
  }

  private spliceProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
  }

  changeProductsChecked(id: number) {
    if (this.checkedProducts.has(id)) {
      this.checkedProducts.delete(id);
    } else {
      this.checkedProducts.add(id);
    }
    console.log(this.checkedProducts)
  }

  deleteChecked() {
    let checked = [...this.checkedProducts]
    // console.log(checked);

    this._adminService.deleteMultipleProducts(checked)
      .subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {

          for (let id of checked) {
            this.spliceProduct(id);
          }
          this.checkedProducts.clear()
        }
      })
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddUpdateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.products.unshift(result);

    });
  }

  updateProduct(product: Product) {
    // console.log(product);
    const dialogRef = this.dialog.open(AddUpdateComponent, {
      data: { 
        product: product,
        update:true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.products = this.products.map(product => product.id === result.id ? result : product);

    });
  }


}
