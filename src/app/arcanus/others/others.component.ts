import { Component, OnInit } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { LoaderComponent } from 'src/app/commons/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArcanusService } from 'src/app/services/arcanus.service'
import { RatingComponent } from 'src/app/commons/rating/rating.component';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ArcanusComponent } from '../arcanus.component';


@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css'],
  standalone: true,
  imports: [
    DividerComponent,
    CommonModule,
    LoaderComponent,
    FormsModule, 
    ReactiveFormsModule,
    RatingComponent,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class OthersComponent implements OnInit {
  otherForm: any;
  msgShow = false;
  isLoading = false;
  msg = '';
  alertType = '';
  isChecked = false;

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder,
    private arcanus: ArcanusComponent
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.otherForm = this.formBuilder.group({
      arcanusId: [this.arcanus.arcanusId],
      sanity: ['0'],
      mana: ['0'],
      lifePoints: ['0'],
      bruised: [false],
      hurted: [false],
      injured: [false],
      seriously: [false],
      beaten: [false],
      crippled: [false],
      incapacitated: [false],
      unconscious: [false]
    });

    this.arcanusService.getOthers(Number(localStorage.getItem('userid'))).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true) {
        this.otherForm.controls.arcanusId.setValue(res.result.arcanusid);
        this.otherForm.controls.sanity.setValue(res.result.sanity);
        this.otherForm.controls.mana.setValue(res.result.mana);
        this.otherForm.controls.lifePoints.setValue(res.result.lifepoints);
        this.otherForm.controls.bruised.setValue(res.result.bruised);
        this.otherForm.controls.hurted.setValue(res.result.hurted);
        this.otherForm.controls.injured.setValue(res.result.injured);
        this.otherForm.controls.seriously.setValue(res.result.seriously);
        this.otherForm.controls.beaten.setValue(res.result.beaten);
        this.otherForm.controls.crippled.setValue(res.result.crippled);
        this.otherForm.controls.incapacitated.setValue(res.result.incapacitated);
        this.otherForm.controls.unconscious.setValue(res.result.unconscious);
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
    this.otherForm.controls[attr].setValue(rating);    
  }

  changed($event: MatCheckboxChange, value: number) {
    var lp = Number(this.otherForm.controls.lifePoints.value);
    var aux = 0;

    if ($event.checked == true) {
      aux = lp - value;
    } else {
      aux = lp + value;
    }

    this.otherForm.controls.lifePoints.setValue(aux);
    this.arcanusService.changed(this.otherForm.value).subscribe();
  }

  otherSubmit() {
    this.isLoading = true;
    this.clearMsg();

    this.arcanusService.setOthers(this.otherForm.value).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true) {        
        this.alertType = 'info';
      } else {
        this.alertType = 'danger';
      }

      this.msgShow = true;
      this.msg = res.msg;
    });
  }

}
