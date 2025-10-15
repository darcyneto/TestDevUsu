import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, Priority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskStateService } from '../../services/task-state.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  private readonly taskService = inject(TaskService);
  private readonly taskStateService = inject(TaskStateService);
  private destroy$ = new Subject<void>();

  tasks: Task[] = [];
  loading = false;
  formOpen = false;
  editingTask: Task | null = null;
  title = '';
  dueDate = '';
  priority: Priority | '' = '';
  @Input() showCompleted = false;

  get filteredTasks(): Task[] {
    return this.showCompleted 
      ? this.taskStateService.getCompletedTasks()
      : this.taskStateService.getPendingTasks();
  }

  ngOnInit(): void {
    this.fetch();
    // Escuta mudanças no estado compartilhado
    this.taskStateService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetch(): void {
    this.loading = true;
    this.taskService.list().subscribe({
      next: tasks => { 
        this.tasks = tasks; 
        this.taskStateService.updateTasks(tasks);
        this.loading = false; 
      },
      error: () => { this.loading = false; }
    });
  }

  openCreate(): void {
    this.editingTask = null;
    this.title = '';
    this.dueDate = '';
    this.priority = '';
    this.formOpen = true;
  }

  openEdit(task: Task): void {
    this.editingTask = task;
    this.title = task.title;
    this.dueDate = task.dueDate || '';
    this.priority = task.priority || '';
    this.formOpen = true;
  }

  submit(): void {
    const trimmed = (this.title ?? '').trim();
    if (!trimmed) return;
    
    const taskData = {
      title: trimmed,
      dueDate: this.dueDate || undefined,
      priority: this.priority || undefined
    };
    
    if (this.editingTask) {
      this.taskService.update(this.editingTask.id, taskData).subscribe({
        next: () => { this.formOpen = false; this.editingTask = null; this.fetch(); },
        error: () => { this.formOpen = false; this.editingTask = null; }
      });
    } else {
      this.taskService.create(taskData).subscribe({
        next: () => { this.formOpen = false; this.fetch(); },
        error: () => { this.formOpen = false; }
      });
    }
  }

  onToggle(id: number, completed: boolean): void {
    this.taskService.toggle(id, completed).subscribe({
      next: () => { this.fetch(); },
      error: () => {}
    });
  }

  onRemove(id: number): void {
    this.taskService.remove(id).subscribe({
      next: () => { this.fetch(); },
      error: () => {}
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}


