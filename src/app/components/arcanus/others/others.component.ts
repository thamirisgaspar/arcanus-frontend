import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ArcanusService } from 'src/app/services/arcanus.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  infoForm: any;
  msgShow = false;
  isLoading = false;
  msg = '';
  alertType = '';

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.infoForm = this.formBuilder.group({
      arcanusId: [localStorage.getItem('id')],
      sanity: ['0'],
      mana: ['0'],
      lifePoints: ['0'],
      bruised: [''],
      hurted: [''],
      injured: [''],
      seriously: [''],
      beaten: [''],
      crippled: [''],
      incapacitated: [''],
      unconscious: ['']
    });

    this.arcanusService.getOthers(Number(localStorage.getItem('id'))).subscribe((res) => {
      if (res.status == true) {
        this.infoForm.controls.sanity.setValue(res.result.sanity);
        this.infoForm.controls.mana.setValue(res.result.mana);
        this.infoForm.controls.lifePoints.setValue(res.result.lifepoints);
        
        if (res.result.bruised == true){
          this.infoForm.controls.bruised.setValue(true);
        }

        if (res.result.hurted == true){
          this.infoForm.controls.hurted.setValue(true);
        }

        if (res.result.injured == true){
          this.infoForm.controls.injured.setValue(true);
        }

        if (res.result.seriously == true){
          this.infoForm.controls.seriously.setValue(true);
        }

        if (res.result.beaten == true){
          this.infoForm.controls.beaten.setValue(true);
        }

        if (res.result.crippled == true){
          this.infoForm.controls.crippled.setValue(true);
        }

        if (res.result.incapacitated == true){
          this.infoForm.controls.incapacitated.setValue(true);
        }

        if (res.result.unconscious == true){
          this.infoForm.controls.unconscious.setValue(true);
        }
      }
    });

    this.isLoading = false;
  }

  clearMsg() {
    this.msgShow = false;
    this.msg = '';
  }

  changed(val: number) {
    var lp = Number(this.infoForm.controls.lifePoints.value);
    var aux = lp - val;

    this.infoForm.controls.lifePoints.setValue(aux + '.00');

    var data = {
      arcanusId: localStorage.getItem('id'),
      lifePoints: aux
    }

    this.arcanusService.changed(data).subscribe();
  }

  infoSubmit() {
    this.isLoading = true;
    this.clearMsg();

    this.arcanusService.setOthers(this.infoForm.value).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true) {
        this.msgShow = true;
        this.msg = res.msg;
        this.alertType = 'info';
      } else {
        this.msgShow = true;
        this.msg = res.msg;
        this.alertType = 'danger';
      }
    });
  }

}
