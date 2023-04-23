import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcanusComponent } from './arcanus.component';

const routes: Routes = [{ path: '', component: ArcanusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArcanusRoutingModule { }
