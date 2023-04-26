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

    this.magicaeForm = this.formBuilder.group({
      magicaes: this.formBuilder.array([
        this.formBuilder.group({
          id: [0],
          arcanusId: [this.arcanus.arcanusId],
          magicae: [''],
          value: ['0']
        })
      ])
    });

    this.isLoading = false;
  }

  clearMsg() {
    this.isLoading = false;
    this.msgShow = false;
    this.msg = '';
    this.alertType = '';
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
      arcanusId: [this.arcanus.arcanusId],
      magicae: [''],
      value: ['0']
    }));
  }

  magicaesSubmit() {
    if (this.magicaeForm.valid) {
      //this.isLoading = true;

      this.arcanusService.setMagicaes(this.magicaeForm.value).subscribe((res) => {
        
      });

    } else {
      this.msg = 'Verifique as magicaes!';
      this.alertType = 'danger';
      this.msgShow = true;
    }
  }

}
