import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArcanusService {
  apiUrl = 'http://localhost:3000/api';
  //apiUrl = 'https://arcanus-backend.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  validate(id: Number) : Observable<any> {
    return this.http.post(`${this.apiUrl}/validate`, {userId: id});
  }

  getArcanus(id: Number) : Observable<any> {
    return this.http.post(`${this.apiUrl}/getArcanus`, {userId: id});
  }

  setArcanus(data: any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/setArcanus`, data);
  }

  getSkills(id: number) : Observable<any> {
    return this.http.post(`${this.apiUrl}/getSkills`, {arcanusId: id});
  }

  setSkills(data: any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/setSkills`, data);
  }

  getOthers(id: number) : Observable<any> {
    return this.http.post(`${this.apiUrl}/getOthers`, {arcanusId: id});
  }

  setOthers(data: any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/setOthers`, data);
  }

  changed(data: any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/changed`, data);
  }
}
