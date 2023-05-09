import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../classes/user/user';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

const authAPI = 'http://127.0.0.1:8000/api/benie/auth/';
// const authAPI = 'https://beniewrites-api-production.up.railway.app/benie/auth/';
const apiURL = 'http://127.0.0.1:8000/benie/';
// const apiURL = 'https://beniewrites-api-production.up.railway.app/benie/';

@Injectable({
  providedIn: 'any'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  apiLogin = authAPI + "login";
  apiLogout = authAPI + "logout/";
  apiUserProfile = apiURL + "user/profile/";
  apiChangePass = apiURL + 'password/change/';
  apiPassResetReq = apiURL + 'password/reset/request/';
  apiPassResetConfirmed = apiURL + 'password/reset/confirmed/';
  apiReg = authAPI + 'register';
  
  constructor(
    private handler: ReqHandlerService,
    ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
     }
  
  

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(userData: User) {
    return this.handler.handlePOST(this.apiLogin, userData)
    .pipe(
      map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }));
  }
  register(userData: User): Observable<User> {
    return this.handler.handlePOST<User>(this.apiReg, userData);
  }
  logout() {
    // return this.http.get<any>(this.apiLogout);
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
  changePassword(passData: any, id:number): Observable<any>{
    return this.handler.handlePUT<any>(this.apiChangePass + id, passData)
  }
  requestResetPassword(userData: any): Observable<any>{
    return this.handler.handlePOST<any>(this.apiPassResetReq, userData)
  }
  resetPassword(passData: any, id:number): Observable<any>{
    return this.handler.handlePUT<any>(this.apiPassResetConfirmed + id, passData)
  }
}
