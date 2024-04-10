import { Component, Input } from '@angular/core';

@Component({
  selector: 'circle-color',
  templateUrl: './circle-color.component.html',
  styleUrls: ['./circle-color.component.scss']
})
export class CircleColorComponent {
  @Input() category: string = '';
}
