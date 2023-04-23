import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isLoading = false;
  msgShow = false;
  hide = true;
  hideC = true;
  alertType = '';
  msg = '';
  resetPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.resetPassword = this.formBuilder.group({
      token: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
        this.patternValidator(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, { hasSpecialCharacters: true }),
      ]],
      passwordC: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    },{
      validators: this.mustMatch('password', 'passwordC')
    });
  }

  mustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors['mustMatch']){
        return;
      }

      if (control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null as any;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null as any : error;
    };
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
      'way': 'unlogged',
      'password': this.resetPassword.controls.password.value,
      'token': this.resetPassword.controls.token.value
    }

    this.usersService.resetPassword(data).subscribe((res) => {
      this.clearMsg;

      if (res.status == true) {
        this.router.navigate(['users']);
      } else {
        this.msgShow = true;
        this.msg = 'res.msg';
        this.alertType = 'danger';
        this.isLoading = false;
      }
    });
  }
}
