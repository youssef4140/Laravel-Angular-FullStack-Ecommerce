import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/models';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
  )
    { }

  searchProducts(body: any): Observable<Product[]> {
    const req = {"search": body}
    return this.http.post<Product[]>(`${this.url}/api/search/products`, req);
  }

  getProducts(page:number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/products?page=${page}`);
  }


  getProductById(id:number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/products/${id}`);
  }

  getProductPerOrderPerUser(): Observable<any> {
    const [token,user] = this.getTokenFromCookies();
    const id = JSON.parse(user).id;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(token));
    return this.http.get<any>(`${this.url}/api/products/orders/user/${id}`, { headers });
  }

  postOrder(body:any): Observable<any> {
    const [token,user] = this.getTokenFromCookies();
    const id = JSON.parse(user).id;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(token));
    console.log(JSON.parse(token))
    return this.http.post<Product[]>(`${this.url}/api/order/${id}`, body, {headers});

  }
  
  private getTokenFromCookies(): string[] {
    return [this._cookieService.get('token'),this._cookieService.get('user')]
  }




  
  
}
