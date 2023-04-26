import { Component, OnInit } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ArcanusService } from 'src/app/services/arcanus.service';
import { LoaderComponent } from 'src/app/commons/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from 'src/app/commons/rating/rating.component';
import { MatButtonModule } from '@angular/material/button';
import { ArcanusComponent } from '../arcanus.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
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
export class SkillsComponent implements OnInit {
  isLoading = false;
  msgShow = false;
  alertType = '';
  msg = '';
  skillsForm: any;

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder,
    private arcanus: ArcanusComponent
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.skillsForm = this.formBuilder.group({
      arcanusId: [this.arcanus.arcanusId],
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

    this.arcanusService.getSkills(Number(localStorage.getItem('userid'))).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true){
        console.log(res)
        this.skillsForm.controls.arcanusId.setValue(res.result.arcanusid);
        this.skillsForm.controls.readness.setValue(res.result.readness);
        this.skillsForm.controls.sports.setValue(res.result.sports);
        this.skillsForm.controls.fight.setValue(res.result.fight);
        this.skillsForm.controls.dodge.setValue(res.result.dodge);
        this.skillsForm.controls.empath.setValue(res.result.empath);
        this.skillsForm.controls.expression.setValue(res.result.expression);
        this.skillsForm.controls.intimidation.setValue(res.result.intimidation);
        this.skillsForm.controls.leadership.setValue(res.result.leadership);
        this.skillsForm.controls.ruse.setValue(res.result.ruse);
        this.skillsForm.controls.lip.setValue(res.result.lip);
        this.skillsForm.controls.animalEmpath.setValue(res.result.animalempath);
        this.skillsForm.controls.trades.setValue(res.result.trades);
        this.skillsForm.controls.conduction.setValue(res.result.conduction);
        this.skillsForm.controls.tag.setValue(res.result.tag);
        this.skillsForm.controls.conduction.setValue(res.result.conduction);
        this.skillsForm.controls.fireGun.setValue(res.result.firegun);
        this.skillsForm.controls.whiteArms.setValue(res.result.whitearms);
        this.skillsForm.controls.perform.setValue(res.result.perform);
        this.skillsForm.controls.security.setValue(res.result.security);
        this.skillsForm.controls.stealth.setValue(res.result.stealth);
        this.skillsForm.controls.survivor.setValue(res.result.survivor);
        this.skillsForm.controls.academic.setValue(res.result.academic);
        this.skillsForm.controls.it.setValue(res.result.it);
        this.skillsForm.controls.financial.setValue(res.result.financial);
        this.skillsForm.controls.investigation.setValue(res.result.investigation);
        this.skillsForm.controls.legal.setValue(res.result.legal);
        this.skillsForm.controls.language.setValue(res.result.language);
        this.skillsForm.controls.medicine.setValue(res.result.medicine);
        this.skillsForm.controls.pagan.setValue(res.result.pagan);
        this.skillsForm.controls.government.setValue(res.result.government);
        this.skillsForm.controls.science.setValue(res.result.science);
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
    this.skillsForm.controls[attr].setValue(rating);    
  }

  skillsSubmit() {
    this.isLoading = true;

    this.arcanusService.setSkills(this.skillsForm.value).subscribe((res) => {
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
