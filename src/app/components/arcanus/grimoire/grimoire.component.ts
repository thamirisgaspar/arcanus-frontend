import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ArcanusService } from 'src/app/services/arcanus.service';

@Component({
  selector: 'app-grimoire',
  templateUrl: './grimoire.component.html',
  styleUrls: ['./grimoire.component.css']
})
export class GrimoireComponent implements OnInit {
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
      animaMentia: ['0'],
      aquaDefensia: ['0'],
      ignisPotentia: ['0'],
      terraeResistentia: ['0'],
      ariaLiteratus: ['0']
    });

    this.arcanusService.getGrimoire(Number(localStorage.getItem('id'))).subscribe((res) => {
      if (res.status == true) {
        this.infoForm.controls.animaMentia.setValue(res.result.animamentia);
        this.infoForm.controls.aquaDefensia.setValue(res.result.acquadefensia);
        this.infoForm.controls.ignisPotentia.setValue(res.result.ignispotentia);
        this.infoForm.controls.terraeResistentia.setValue(res.result.terraeresistentia);
        this.infoForm.controls.ariaLiteratus.setValue(res.result.arialiteratus);
      }
    });

    this.isLoading = false;
  }

  clearMsg() {
    this.msgShow = false;
    this.msg = '';
  }

  infoSubmit() {
    this.isLoading = true;
    this.clearMsg();

    this.arcanusService.setGrimoire(this.infoForm.value).subscribe((res) => {
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
