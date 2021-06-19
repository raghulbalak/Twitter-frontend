import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { SignupComponent } from './signup/signup.component';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private loggedIn = new BehaviorSubject<Boolean>(false);
  $loggedIn = this.loggedIn.asObservable();

  constructor(private _http: HttpClient) { }

  public login(loginForm: any) {
    const url = baseUrl + '/login';
    return this._http.post(url, loginForm);
  }

  public forgotPassword(userId: any,password: any) {
    const url = baseUrl + '/' + userId + '/forgot';
    return this._http.put(url, JSON.stringify(password), { headers: this.headers });
  }

  public getAllUsers() {
    const url = baseUrl + '/' + 'users/all';
    return this._http.get(url);
  }

  public getUser(userId: any) {
    const url = baseUrl + '/users/' + userId;
    return this._http.get(url, { headers: this.headers });
  }

  public register(signupForm: any) {
    const url = baseUrl + '/register';
    return this._http.post(url, signupForm);
  }

  public users() {
    const url = baseUrl + '/users/all';
    return this._http.get(url);
  }

  public setLoggedIn(value: any) {
    return this.loggedIn.next(value);
  }

  get loggedInStatus() {
    if (sessionStorage.getItem('token')) {
      this.loggedIn.next(true);
    }
    return this.$loggedIn;
  }
}
