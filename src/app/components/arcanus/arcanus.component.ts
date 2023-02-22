import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arcanus',
  templateUrl: './arcanus.component.html',
  styleUrls: ['./arcanus.component.css']
})
export class ArcanusComponent implements OnInit {

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
