import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL:string = "https://route-movies-api.vercel.app";
  userData:BehaviorSubject<object|null> = new BehaviorSubject<object|null>(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    this.decodeUserData();
  }

  decodeUserData(){
    let encodedToken:string|null = localStorage.getItem('userToken');
    if(encodedToken){
      try {
        let decodedToken = jwtDecode<object>(encodedToken);
        this.userData.next(decodedToken);
      } catch (err) {
        console.log('Invalid Token');
      }
    }
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + '/signin', userData);
  }

  register(userData: object):Observable<any> {
    return this._HttpClient.post(this.baseURL + '/signup', userData);
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
