import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcanusRoutingModule } from './arcanus-routing.module';
import { ArcanusComponent } from './arcanus.component';


@NgModule({
  declarations: [
    ArcanusComponent
  ],
  imports: [
    CommonModule,
    ArcanusRoutingModule
  ]
})
export class ArcanusModule { }
