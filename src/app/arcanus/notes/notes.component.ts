import { Component } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [
    DividerComponent
  ]
})
export class NotesComponent {

}
