import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class DividerComponent {
  @Input() divider: string = '';
}
