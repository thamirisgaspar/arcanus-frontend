import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ArcanusService } from 'src/app/services/arcanus.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
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
      notes: ['']
    });

    this.arcanusService.getNotes(Number(localStorage.getItem('id'))).subscribe((res) => {
      if (res.status == true){
        this.infoForm.controls.notes.setValue(res.result.notes);
      }
    });

    this.isLoading = false;
  }

  clearMsg() {
    this.msgShow = false;
    this.msg = '';
  }

  infoSubmit(){
    this.isLoading = true;
    this.clearMsg();

    this.arcanusService.setNotes(this.infoForm.value).subscribe((res) => {
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
