import { Component, OnInit } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/commons/loader/loader.component';
import { RatingComponent } from 'src/app/commons/rating/rating.component';
import { MatButtonModule } from '@angular/material/button';
import { ArcanusService } from 'src/app/services/arcanus.service';
import { ArcanusComponent } from '../arcanus.component';

@Component({
  selector: 'app-grimoire',
  templateUrl: './grimoire.component.html',
  styleUrls: ['./grimoire.component.css'],
  standalone: true,
  imports: [
    DividerComponent,
    CommonModule,
    LoaderComponent,
    FormsModule, 
    ReactiveFormsModule,
    RatingComponent,
    MatButtonModule
  ]
})
export class GrimoireComponent implements OnInit {
  grimForm: any;
  msgShow = false;
  isLoading = false;
  msg = '';
  alertType = '';

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder,
    private arcanus: ArcanusComponent
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.grimForm = this.formBuilder.group({
      arcanusId: [this.arcanus.arcanusId],
      animaMentia: ['0'],
      aquaDefensia: ['0'],
      ignisPotentia: ['0'],
      terraeResistentia: ['0'],
      ariaLiteratus: ['0']
    });

    this.arcanusService.getGrimoire(Number(localStorage.getItem('userid'))).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true && res.msg != 'Grimorio não encontrado') {
        this.grimForm.controls.arcanusId.setValue(res.result.arcanusid);
        this.grimForm.controls.animaMentia.setValue(res.result.animamentia);
        this.grimForm.controls.aquaDefensia.setValue(res.result.acquadefensia);
        this.grimForm.controls.ignisPotentia.setValue(res.result.ignispotentia);
        this.grimForm.controls.terraeResistentia.setValue(res.result.terraeresistentia);
        this.grimForm.controls.ariaLiteratus.setValue(res.result.arialiteratus);
      }
    });
  }

  clearMsg() {
    this.isLoading = false;
    this.msgShow = false;
    this.msg = '';
    this.alertType = '';
  }

  onRatingChanged(rating: Number, attr: string){
    this.grimForm.controls[attr].setValue(rating);    
  }

  grimSubmit(){
    this.isLoading = true;

    this.arcanusService.setGrimoire(this.grimForm.value).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true) {
        this.alertType = 'info';
      } else {
        this.alertType = 'danger';
      }

      this.msg = res.msg;
      this.msgShow = true;
      this.isLoading = false;
    });
  }

}
