import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl = 'http://localhost:3000/api';
  //apiUrl = 'https://arcanus-backend.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  sendEmail(data: any){
    let user = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    }

    this.http.post(`${this.apiUrl}/sendmail`, user).subscribe(data => {
      let res:any = data;
    },
    err => {
      console.log(err);
    });
  }
}
