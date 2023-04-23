import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcanusRoutingModule } from './arcanus-routing.module';
import { ArcanusComponent } from './arcanus.component';
import { LoaderComponent } from '../commons/loader/loader.component';
import { LogoutComponent } from '../commons/logout/logout.component';
import { DividerComponent } from '../commons/divider/divider.component';

@NgModule({
  declarations: [
    ArcanusComponent
  ],
  imports: [
    CommonModule,
    ArcanusRoutingModule,
    LogoutComponent,
    DividerComponent,
    LoaderComponent
  ]
})
export class ArcanusModule { }
