import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ArcanusService } from 'src/app/services/arcanus.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
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
      readness: ['0'],
      sports: ['0'],
      fight: ['0'],
      dodge: ['0'],
      empath: ['0'],
      expression: ['0'],
      intimidation: ['0'],
      leadership: ['0'],
      ruse: ['0'],
      lip: ['0'],
      animalEmpath: ['0'],
      trades: ['0'],
      conduction: ['0'],
      tag: ['0'],
      fireGun: ['0'],
      whiteArms: ['0'],
      perform: ['0'],
      security: ['0'],
      stealth: ['0'],
      survivor: ['0'],
      academic: ['0'],
      it: ['0'],
      financial: ['0'],
      investigation: ['0'],
      legal: ['0'],
      language: ['0'],
      medicine: ['0'],
      pagan: ['0'],
      government: ['0'],
      science: ['0']
    });

    this.arcanusService.getSkills(Number(localStorage.getItem('id'))).subscribe((res) => {
      if (res.status == true){
        this.infoForm.controls.readness.setValue(res.result.readness);
        this.infoForm.controls.sports.setValue(res.result.sports);
        this.infoForm.controls.fight.setValue(res.result.fight);
        this.infoForm.controls.dodge.setValue(res.result.dodge);
        this.infoForm.controls.empath.setValue(res.result.empath);
        this.infoForm.controls.expression.setValue(res.result.expression);
        this.infoForm.controls.intimidation.setValue(res.result.intimidation);
        this.infoForm.controls.leadership.setValue(res.result.leadership);
        this.infoForm.controls.ruse.setValue(res.result.ruse);
        this.infoForm.controls.lip.setValue(res.result.lip);
        this.infoForm.controls.animalEmpath.setValue(res.result.animalempath);
        this.infoForm.controls.trades.setValue(res.result.trades);
        this.infoForm.controls.conduction.setValue(res.result.conduction);
        this.infoForm.controls.tag.setValue(res.result.tag);
        this.infoForm.controls.conduction.setValue(res.result.conduction);
        this.infoForm.controls.fireGun.setValue(res.result.firegun);
        this.infoForm.controls.whiteArms.setValue(res.result.whitearms);
        this.infoForm.controls.perform.setValue(res.result.perform);
        this.infoForm.controls.security.setValue(res.result.security);
        this.infoForm.controls.stealth.setValue(res.result.stealth);
        this.infoForm.controls.survivor.setValue(res.result.survivor);
        this.infoForm.controls.academic.setValue(res.result.academic);
        this.infoForm.controls.it.setValue(res.result.it);
        this.infoForm.controls.financial.setValue(res.result.financial);
        this.infoForm.controls.investigation.setValue(res.result.investigation);
        this.infoForm.controls.legal.setValue(res.result.legal);
        this.infoForm.controls.language.setValue(res.result.language);
        this.infoForm.controls.medicine.setValue(res.result.medicine);
        this.infoForm.controls.pagan.setValue(res.result.pagan);
        this.infoForm.controls.government.setValue(res.result.government);
        this.infoForm.controls.science.setValue(res.result.science);
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

    this.arcanusService.setSkills(this.infoForm.value).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true){
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
