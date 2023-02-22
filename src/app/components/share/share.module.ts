import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    SpinnerComponent,
    LogoutComponent
  ]
})
export class ShareModule { }
