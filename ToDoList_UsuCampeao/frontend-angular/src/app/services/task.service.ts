import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  // Adjust baseUrl when backend is ready
  private readonly baseUrl = 'http://localhost:3000/api/tasks';

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  create(payload: Pick<Task, 'title'> & Partial<Pick<Task, 'dueDate' | 'priority'>>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, payload);
  }

  update(id: number, payload: Partial<Pick<Task, 'title' | 'completed' | 'dueDate' | 'priority'>>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, payload);
  }

  toggle(id: number, completed: boolean): Observable<Task> {
    return this.update(id, { completed });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

