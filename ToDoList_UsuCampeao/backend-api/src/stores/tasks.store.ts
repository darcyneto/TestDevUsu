import type { Task } from '../models/task.model.js';

export class TasksStore {
 
  private tasks: Task[] = [
    { id: 1, title: 'Aprender Angular', completed: false, dueDate: '2024-12-15', priority: 'alta' },
    { id: 2, title: 'Montar a API com Node', completed: true, dueDate: '2024-11-30', priority: 'média' },    
  ];
  private nextId = 4;

  list(): Task[] {
    return this.tasks;
  }

  create(data: { title: string; dueDate?: string; priority?: string }): Task {
    debugger;
    const task: Task = { 
      id: this.nextId++, 
      title: data.title.trim(), 
      completed: false
    };
    
    if (data.dueDate) {
      task.dueDate = data.dueDate;
    }
    
    if (data.priority) {
      task.priority = data.priority as any;
    }
    
    this.tasks.push(task);
    return task;
  }

  update(id: number, updates: Partial<Pick<Task, 'title' | 'completed' | 'dueDate' | 'priority'>>): Task | undefined {
    debugger;
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return undefined;
    const taskToUpdate = this.tasks[idx]!;
    if (updates.title !== undefined) taskToUpdate.title = updates.title.trim();
    if (updates.completed !== undefined) taskToUpdate.completed = updates.completed;
    if (updates.dueDate !== undefined) taskToUpdate.dueDate = updates.dueDate;
    if (updates.priority !== undefined) taskToUpdate.priority = updates.priority;
    return taskToUpdate;
  }

  delete(id: number): boolean {
    debugger;
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }
}

export const tasksStore = new TasksStore();


