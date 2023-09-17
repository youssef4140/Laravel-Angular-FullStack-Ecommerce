import { Component,ViewEncapsulation, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/_services/products/products.service'
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/_models/models';
import { LoginRegisterComponent } from '../login-register/login-register.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  host: {
    '(document:click)': 'onClick($event)',
  },

})
export class NavbarComponent {
  constructor(
    private _productsService: ProductsService, 
    public dialog: MatDialog,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar,
    private router:Router,
    private _eref: ElementRef,
    private _renderer: Renderer2

    ) { 
      try {
        this.user = JSON.parse(this.cookieService.get('user'));
      } catch (error) {
        console.log('Error parsing user cookie:', error);
        this.user = null;
      }
    };
  searchInput: string = '';
  searchResult!:any;
  user:User|null= null;

  @ViewChild('searchBox') searchBox!: ElementRef;

  onClick(event:any){
    if(!this._eref.nativeElement.contains(event.target)){
      this.closeSearchBox();
    }
  }
  closeSearchBox(){
    const searchBoxIsVisible = this.searchBox.nativeElement.classList.contains('show');
    if(searchBoxIsVisible){
      this._renderer.removeClass(this.searchBox.nativeElement,'show');
    }
  }
  search() {
    this._productsService.searchProducts(this.searchInput)
      .subscribe({
        next: (results) => {
          this.searchResult = results;
          if(this.searchResult){
            this._renderer.addClass(this.searchBox.nativeElement,'show');

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
  

  login(){
    const dialogRef = this.dialog.open(LoginRegisterComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.user = result.user;
    });
  }

  signOut(): void {
    this.user = null;
    this.cookieService.delete('user');
    this.cookieService.delete('token');

    localStorage.removeItem('cart');
    
    this.router.navigate(['/shop']);

  }
  loginAlert(){
    this._snackBar.open(('You must login first!'), 'X', { duration: 2000 })
    
  }
}

