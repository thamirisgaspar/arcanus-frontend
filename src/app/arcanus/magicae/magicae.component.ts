import { Component, OnInit } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder } from '@angular/forms';
import { ArcanusService } from 'src/app/services/arcanus.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/commons/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ArcanusComponent } from '../arcanus.component';
import { RatingComponent } from 'src/app/commons/rating/rating.component';

@Component({
  selector: 'app-magicae',
  templateUrl: './magicae.component.html',
  styleUrls: ['./magicae.component.css'],
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
export class MagicaeComponent implements OnInit {
  isLoading = false;
  msgShow = false;
  alertType = '';
  msg = '';
  magicaeForm: any;

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder,
    private arcanus: ArcanusComponent
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.arcanus.isLoading = true;

    this.magicaeForm = this.formBuilder.group({
      arcanusId: [this.arcanus.arcanusId],
      magicaes: this.formBuilder.array([
        this.formBuilder.group({
          id: [0],
          magicae: [''],
          value: ['0']
        })
      ])
    });

    this.arcanusService.getMagicaes(Number(localStorage.getItem('userid'))).subscribe(res => {      
      if(res.status == true) {
        this.removeMagicae(0);
        this.magicaeForm.controls.arcanusId.setValue(this.arcanus.arcanusId);

        for (var i = 0; i < res.result.length; i++) {
          const control = <FormArray>this.magicaeForm.controls['magicaes'];
          control.push(this.formBuilder.group({
            id: [res.result[i].id],
            magicae: [res.result[i].magicae],
            value: [res.result[i].val]
          }));

          this.magicaeForm.controls['magicaes'].controls[i].controls['magicae'].disable();
        }
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

  onRatingChanged(rating: Number, id: number, attr: string){
    this.magicaeForm.controls['magicaes'].controls[id].controls['value'].setValue(rating);    
  }

  get getMagicaes() {
    return this.magicaeForm.get('magicaes') as FormArray;
  }

  addMagicae() {
    const control = <FormArray>this.magicaeForm.controls['magicaes'];
    control.push(this.formBuilder.group({
      id: [0],
      magicae: [''],
      value: ['0']
    }));
  }

  removeMagicae(index: number) {
    const control = <FormArray>this.magicaeForm.controls['magicaes'];
    control.removeAt(index);
  }

  magicaesSubmit() {
    if (this.magicaeForm.valid) {
      this.isLoading = true;
      this.arcanus.isLoading = true;

      this.arcanusService.setMagicaes(this.magicaeForm.value).subscribe((res) => {
        if (res.status == true) {
          this.alertType = 'info';
          window.location.reload();
        } else {
          this.alertType = 'danger';
        }

        this.msg = res.msg;
        this.msgShow = true;
        this.isLoading = false;
        this.arcanus.isLoading = false;
      });

    } else {
      this.msg = 'Verifique as magicaes!';
      this.alertType = 'danger';
      this.msgShow = true;
    }
  }

}
