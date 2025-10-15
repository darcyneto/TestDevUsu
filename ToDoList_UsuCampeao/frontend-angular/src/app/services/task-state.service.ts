import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskStateService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  updateTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  getPendingTasks(): Task[] {
    return this.tasksSubject.value.filter(task => !task.completed);
  }

  getCompletedTasks(): Task[] {
    return this.tasksSubject.value.filter(task => task.completed);
  }
}
