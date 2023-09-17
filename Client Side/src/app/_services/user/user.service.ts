import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserToken } from 'src/app/_models/models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8000';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  // getUser(): User {
  //   return JSON.parse(this.cookieService.get('user'));
  // }

  // setUser(user: User): void {
  //   this.cookieService.set('user', JSON.stringify(user));
  // }

  login(body: any): Observable<UserToken> {
    return this.http.post<UserToken>(`${this.url}/api/login`, body);
  }

  register(body: any): Observable<UserToken> {
    return this.http.post<UserToken>(`${this.url}/api/register`, body);
  }
}
