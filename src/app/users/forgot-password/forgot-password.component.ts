import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  msgShow = false;
  alertType = '';
  msg = '';
  resetForm : any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.resetForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
    });
  }

  clearMsg() {
    this.isLoading = false;
    this.msgShow = false;
    this.msg = '';
    this.alertType = '';
  }

  resetSubmit(){  
    this.isLoading = true;

    var data = {
      'username' : this.resetForm.controls.username.value
    }

    this.userService.forgetPassword(data).subscribe((res) => {
      this.clearMsg;

      if (res.status == true) {
        this.router.navigate(['resetPassword']);
      } else {
        this.msgShow = true;
        this.msg = 'Erro ao solicitar troca da senha! Tente novamente!';
        this.alertType = 'danger';
        this.isLoading = false;
      }
    })
  }

}
