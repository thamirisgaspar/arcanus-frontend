import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = 'http://localhost:3000/api';
  //apiUrl = 'https://arcanus-backend.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  signup(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  login(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  forgetPassword(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/forgetPassword`, data);
  }

  resetPassword(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/resetPassword`, data);
  }
}
