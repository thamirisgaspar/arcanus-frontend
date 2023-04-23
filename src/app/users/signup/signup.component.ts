import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MailService } from 'src/app/services/mail.service';
import { UsersService } from 'src/app/services/users.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SignupComponent implements OnInit {
  signupForm: any;
  isLoading = false;
  msgShow = false;
  alertType = '';
  msg = '';
  hide = true;
  hideC = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mailService: MailService,
    private usersService: UsersService,
    private users: UsersComponent
  ) { }

  ngOnInit() : void {
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

  clearMsg() {
    this.isLoading = false;
    this.users.isLoading = false;
    this.msgShow = false;
    this.msg = '';
    this.alertType = '';
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

  signupSubmit() {
    this.isLoading = true;
    this.users.isLoading = true;

    this.usersService.signup(this.signupForm.value).subscribe((res) => {
      this.clearMsg;

      if (res.status == true) {
        var data = {
          name: this.signupForm.controls.name.value,
          email: this.signupForm.controls.username.value,
          subject: 'Registro em Accarnum Oculltus',
          message: `<h1>Olá ${this.signupForm.controls.name.value}</h1><br>
          <h4>Obrigada pelo seu registro! Sua conta agora está ativa. </h4>`
        }

        this.mailService.sendEmail(data);
        this.msg = res.msg;
        this.alertType = 'info';
      } else {        
        this.msg = 'Erro ao criar registro! Tente novamente!';
        this.alertType = 'danger';
        
      }

      this.msgShow = true;
      this.isLoading = false;
      this.users.isLoading = false;
    });
  }
}
