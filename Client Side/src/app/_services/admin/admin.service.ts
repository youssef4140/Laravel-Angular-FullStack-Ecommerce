import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  private url = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
  )
    { }

    addProduct(body: any): Observable<any> {
      const token = this.getTokenFromCookies();
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(token));
      // console.log(JSON.parse(token))
      return this.http.post<Product[]>(`${this.url}/api/products`, body, {headers});

    }
    updateProduct(body:any,product_id:number): Observable<any>{
      const token = this.getTokenFromCookies();
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(token));
      // console.log(JSON.parse(token))
      return this.http.put<Product>(`${this.url}/api/products/${product_id}`, body, {headers});
    }

    deleteProductById(product_id:number): Observable<any>{
      const token = this.getTokenFromCookies();
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(token));
      // console.log(JSON.parse(token))
      return this.http.delete<Product[]>(`${this.url}/api/products/${product_id}`, {headers});
    }

    deleteMultipleProducts(body:number[]): Observable<any>{
      const token = this.getTokenFromCookies();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(token)
      });
    
      const options = {
        headers: headers,
        body: body
      };
    
      return this.http.delete<any>(`${this.url}/api/products`, options);
    }
    
    getAllOrders(): Observable<any>{
      const token = this.getTokenFromCookies();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(token)
      });
    
      const options = {
        headers: headers,
      };
    
      return this.http.get<any>(`${this.url}/api/products/orders/users`, options);
    }
    
      
  private getTokenFromCookies(): string {
    return this._cookieService.get('token')
  }

}
