import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MailService } from 'src/app/services/mail.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  msg: any;
  msgShow = false;
  isLoading = false;
  alertType = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mailService: MailService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  clearMsg(){
    this.msgShow = false;
    this.msg = '';
  }

  loginSubmit(){
    this.isLoading = true;
    this.clearMsg();

    this.userService.login(this.loginForm.value).subscribe((res) => {
      this.isLoading = false;
      
      if (res.status == true){
        localStorage.setItem('token', res.token);
        localStorage.setItem('userid', res.result.id);
        localStorage.setItem('user', res.result.username);
        localStorage.setItem('name', res.result.name);

        var data = {
          name: localStorage.getItem('name'),
          email: localStorage.getItem('user'),
          subject: 'Login em Arcanum Oculltus',
          message: `<h1>Olá ${localStorage.getItem('name')}</h1><br>
          <h4>Um novo login foi verificado em sua conta.</h4>`
        }

        this.mailService.sendEmail(data);

        this.router.navigate(['/home']);
      } else {
        this.msgShow = true;
        this.msg = res.msg;
        this.alertType = 'danger';
      }
    });
  }
}
