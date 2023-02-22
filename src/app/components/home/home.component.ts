import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ArcanusService } from 'src/app/services/arcanus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  infoForm: any;
  msgShow = false;
  msg = '';
  alertType = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private arcanusService: ArcanusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.isLoading = true;

    this.arcanusService.validate(Number(localStorage.getItem('userid'))).subscribe((res) => {
      this.isLoading = false;

      if (res.status == false) {
        this.router.navigate(['/arcanus']);
      } else {
        this.infoForm = this.formBuilder.group({
          char: ['', [Validators.required]],
          player: [localStorage.getItem('name')],
          class: ['', [Validators.required]],
          chronicle: ['', [Validators.required]],
          xp: ['', [Validators.required]],
          background: ['']
        });
      }
    });
  }

  clearMsg() {
    this.msgShow = false;
    this.msg = '';
  }

  infoSubmit() {
    this.isLoading = true;
    this.clearMsg();

    debugger;

    var data = {
      'userId': localStorage.getItem('userid'),
      'char': this.infoForm.controls.char.value,
      'class': this.infoForm.controls.class.value,
      'chronicle': this.infoForm.controls.chronicle.value,
      'xp': this.infoForm.controls.xp.value,
      'background': this.infoForm.controls.background.value
    };

    this.arcanusService.setArcanus(data).subscribe((res) => {
      this.isLoading = false;

      if (res.status == true){
        this.router.navigate(['arcanus']);
      } else {
        this.msgShow = true;
        this.msg = res.msg;
        this.alertType = 'danger';
      }
    });
  }

}
