import { Component, OnInit } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ArcanusService } from 'src/app/services/arcanus.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/commons/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RatingComponent } from 'src/app/commons/rating/rating.component';
import { CommonModule } from '@angular/common';
import { ArcanusComponent } from '../arcanus.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  standalone: true,
  imports: [
    DividerComponent,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    LoaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RatingComponent
  ]
})
export class InformationComponent implements OnInit {
  isLoading = false;
  msgShow = false;
  alertType = '';
  msg = '';
  infoForm: any;

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder,
    private arcanus: ArcanusComponent
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.arcanus.isLoading = true;

    this.infoForm = this.formBuilder.group({
      player: [localStorage.getItem('name')],
      char: ['', Validators.required],
      class: ['', Validators.required],
      chronicle: ['', Validators.required],
      xp: ['', Validators.required],
      background: [''],
      streight: ['1'],
      dexterity: ['1'],
      life: ['1'],
      charisma: ['1'],
      manipulation: ['1'],
      apearence: ['1'],
      perception: ['1'],
      intelligence: ['1'],
      reasoning: ['1']
    });

    this.infoForm.controls['player'].disable();
    
    this.arcanusService.getArcanus(Number(localStorage.getItem('userid'))).subscribe((res) => {
      if (res.status == true && res.result != null) {
        this.arcanus.arcanusId = res.result.id;
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
        this.arcanus.loadForm();
      }
    });

    this.isLoading = false;
    this.arcanus.isLoading = false;
  }

  clearMsg() {
    this.isLoading = false;
    this.msgShow = false;
    this.msg = '';
    this.alertType = '';
    this.arcanus.isLoading = false;
  }

  onRatingChanged(rating: Number, attr: string){
    this.infoForm.controls[attr].setValue(rating);    
  }

  infoSubmit(){
    this.isLoading = true;
    this.arcanus.isLoading = true;
    
    var data = {
      'arcanusId': this.arcanus.arcanusId,
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
      if (res.status == true) {
        this.alertType = 'info';
        this.arcanus.loadForm();
      } else {
        this.alertType = 'danger';
      }

      this.msg = res.msg;
      this.msgShow = true;
      this.isLoading = false;
      this.arcanus.isLoading = false;
    });
  }

}
