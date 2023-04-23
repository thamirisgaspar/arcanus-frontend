import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/commons/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';
import { UsersService } from 'src/app/services/users.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    LoaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class LoginComponent implements OnInit {
  isLoading = false;
  msgShow = false;
  hide = true;
  alertType = '';
  msg = '';
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mailService: MailService,
    private usersService: UsersService,
    private users: UsersComponent
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  clearMsg() {
    this.isLoading = false;
    this.msgShow = false;
    this.msg = '';
    this.alertType = '';
    this.users.isLoading = false;
  }

  loginSubmit() {
    this.isLoading = true;
    this.users.isLoading = true;

    this.usersService.login(this.loginForm.value).subscribe((res) => {
      this.clearMsg;

      if (res.status == true) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userid', res.result.id);
        localStorage.setItem('user', res.result.username);
        localStorage.setItem('name', res.result.name);

        var data = {
          name: localStorage.getItem('name'),
          email: localStorage.getItem('user'),
          subject: 'Login em Arcanum Oculltus',
          message: `<h1>Olá ${localStorage.getItem('name')}</h1><br>
          <h4>Um novo login foi verificado na sua conta </h4>`
        }

        this.mailService.sendEmail(data);
        this.router.navigate(['/arcanus']);
      } else {
        this.msgShow = true;
        this.msg = 'Erro ao logar! Tente novamente!';
        this.alertType = 'danger';
        this.isLoading = false;
        this.users.isLoading = false;
      }
    });
  }
  
}
