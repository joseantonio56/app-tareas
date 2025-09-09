import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'] // o .scss si usas
})
export class TaskComponent {
  @Input() task!: Task;
}
