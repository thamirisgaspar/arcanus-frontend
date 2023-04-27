import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';
import { FormBuilder } from '@angular/forms';
import { ArcanusService } from 'src/app/services/arcanus.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/commons/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ArcanusComponent } from '../arcanus.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [
    DividerComponent,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    LoaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class NotesComponent implements OnInit {
  isLoading = false;
  msgShow = false;
  alertType = '';
  msg = '';
  notesForm: any;

  constructor(
    private arcanusService: ArcanusService,
    private formBuilder: FormBuilder,
    private arcanus: ArcanusComponent
  ) { }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.arcanus.isLoading = true;

    this.notesForm = this.formBuilder.group({
      arcanusId: [this.arcanus.arcanusId],
      notes: ['']
    });

    this.arcanusService.getNotes(Number(localStorage.getItem('userid'))).subscribe((res) => {
      if (res.status == true) {
        this.notesForm.controls.arcanusId.setValue(res.result.arcanusid);
        this.notesForm.controls.notes.setValue(res.result.notes);
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

  notesSubmit(){
    this.isLoading = true;
    this.arcanus.isLoading = true;

    this.arcanusService.setNotes(this.notesForm.value).subscribe((res) => {
      if (res.status == true) {
        this.alertType = 'info';
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
