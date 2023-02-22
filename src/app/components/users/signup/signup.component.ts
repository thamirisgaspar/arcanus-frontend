import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MailService } from 'src/app/services/mail.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: any;
  msgShow = false;
  msg = '';
  isLoading = false;
  alertType = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mailService: MailService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
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

  clearMsg(){
    this.msgShow = false;
    this.msg = '';
  }

  signupSubmit(){
    this.isLoading = true;
    this.clearMsg();

    this.usersService.signup(this.signupForm.value).subscribe((res) => {
      this.isLoading = false;
      
      if (res.status == true){
        var data = {
          name: this.signupForm.controls.name.value,
          email: this.signupForm.controls.username.value,
          subject: 'Registro em Accarnum Oculltus',
          message: `<h1>Olá ${this.signupForm.controls.name.value}</h1><br>
          <h4>Obrigada pelo seu registro! Sua conta agora está ativa. </h4>`
        }

        this.mailService.sendEmail(data);
        this.router.navigate(['/users'], {queryParams: {'login' : 'active true'}});
        this.msg = res.msg;
        this.alertType = 'info';
        this.msgShow = true;
      } else {
        this.msgShow = true;
        this.msg = res.msg;
        this.alertType = 'danger';
      }
    });
  }

}
