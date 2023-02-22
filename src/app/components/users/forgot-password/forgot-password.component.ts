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
  msg = '';
  alertType = '';
  resetForm: any;
  user: any;
  msgShow = false;
  isLoading = false;

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
    this.msgShow = false;
    this.msg = '';
  }

  resetSubmit() {
    this.isLoading = true;
    
    var data = {
      'username' : this.resetForm.controls.username.value
    }

    this.userService.forgetPassword(data).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true){
        this.router.navigate(['resetPassword']);
      } else {
        this.msgShow = true;
        this.msg = res.msg;
        this.alertType = 'danger';
      }
    });
  }

}
