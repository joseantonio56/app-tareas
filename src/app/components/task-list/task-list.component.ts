import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  tasks: (Task & { showDescription: boolean })[] = [];

  newTask: Task = {
    title: '',
    description: '',
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks).map((t: any) => ({
        ...t,
        showDescription: false,
      }));
    }
  }

  ngAfterViewInit() {
    this.setFocusTitleInput();
  }

  addTask() {
    if (!this.newTask.title.trim()) return;

    this.tasks.push({ ...this.newTask, showDescription: false });
    this.newTask = { title: '', description: '' };
    this.saveTasks();
    this.setFocusTitleInput();
  }

  toggleDescription(index: number) {
    this.tasks[index].showDescription = !this.tasks[index].showDescription;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.newTask = { title: '', description: '' };
    this.saveTasks();
    this.setFocusTitleInput();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private setFocusTitleInput() {
    this.cd.detectChanges();
    setTimeout(() => {
      const input = this.titleInput?.nativeElement;
      if (input) input.focus();
    }, 100);
  }
}
