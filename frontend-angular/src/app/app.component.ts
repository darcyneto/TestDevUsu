import { Component, ViewChild } from '@angular/core';
import { TasksComponent } from './components/tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';

  @ViewChild('tasksCmp') tasksComponent?: TasksComponent;

  openCreateFromParent(): void {
    this.tasksComponent?.openCreate();
  }
}


