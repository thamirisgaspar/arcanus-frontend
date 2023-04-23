import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }, 
  { path: 'forgotPassword', loadChildren: () => import('./users/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) }, 
  { path: 'resetPassword', loadChildren: () => import('./users/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'arcanus', loadChildren: () => import('./arcanus/arcanus.module').then(m => m.ArcanusModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
