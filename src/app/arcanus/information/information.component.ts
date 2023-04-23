import { Component } from '@angular/core';
import { DividerComponent } from 'src/app/commons/divider/divider.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  standalone: true,
  imports: [
    DividerComponent
  ]
})
export class InformationComponent {

}
