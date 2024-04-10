import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent {
  @Input() taskItem: any | null = null;
}
