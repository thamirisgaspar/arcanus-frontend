import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DividerComponent } from '../commons/divider/divider.component';
import { LoaderComponent } from '../commons/loader/loader.component';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    DividerComponent,
    MatTabsModule,
    LoaderComponent
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
