import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ArcanusService } from 'src/app/services/arcanus.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  infoForm: any;
  msgShow = false;
  msg = '';
  alertType = '';
  isLoading = false;

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.infoForm = this.formBuilder.group({
      player: [localStorage.getItem('name')],
      char: ['', Validators.required],
      class: ['', Validators.required],
      chronicle: ['', Validators.required],
      xp: ['', Validators.required],
      background: [''],
      streight: [''],
      dexterity: [''],
      life: [''],
      charisma: [''],
      manipulation: [''],
      apearence: [''],
      perception: [''],
      intelligence: [''],
      reasoning: ['']
    });

    this.arcanusService.getArcanus(Number(localStorage.getItem('userid'))).subscribe((res) => {
      if (res.status == true) {
        localStorage.setItem('id', res.result.id); 
        this.infoForm.controls.char.setValue(res.result.char);
        this.infoForm.controls.class.setValue(res.result.class);
        this.infoForm.controls.chronicle.setValue(res.result.chronicle) 
        this.infoForm.controls.xp.setValue(Number(res.result.xp));
        this.infoForm.controls.background.setValue(res.result.background);
        this.infoForm.controls.streight.setValue(res.result.streight);
        this.infoForm.controls.dexterity.setValue(res.result.dexterity);
        this.infoForm.controls.life.setValue(res.result.life);
        this.infoForm.controls.charisma.setValue(res.result.charisma);
        this.infoForm.controls.manipulation.setValue(res.result.manipulation);
        this.infoForm.controls.apearence.setValue(res.result.apearence);
        this.infoForm.controls.perception.setValue(res.result.perception);
        this.infoForm.controls.intelligence.setValue(res.result.intelligence);
        this.infoForm.controls.reasoning.setValue(res.result.reasoning);
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

    var data = {
      'arcanusId': localStorage.getItem('id'),
      'userId': localStorage.getItem('userid'),
      'char': this.infoForm.controls.char.value,
      'class': this.infoForm.controls.class.value,
      'chronicle': this.infoForm.controls.chronicle.value,
      'xp': this.infoForm.controls.xp.value,
      'background': this.infoForm.controls.background.value,
      'streight': this.infoForm.controls.streight.value,
      'dexterity': this.infoForm.controls.dexterity.value,
      'life': this.infoForm.controls.life.value,
      'charisma': this.infoForm.controls.charisma.value,
      'manipulation': this.infoForm.controls.manipulation.value,
      'apearence': this.infoForm.controls.apearence.value,
      'perception': this.infoForm.controls.perception.value,
      'intelligence': this.infoForm.controls.intelligence.value,
      'reasoning': this.infoForm.controls.reasoning.value
    };

    this.arcanusService.setArcanus(data).subscribe((res) => {
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
