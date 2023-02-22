import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcanusComponent } from './components/arcanus/arcanus.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component';
import { LoginComponent } from './components/users/login/login.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users', component: UsersComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'arcanus', component: ArcanusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
