export type Priority = 'baixa' | 'média' | 'alta' | 'urgente';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: Priority;
  createdAt?: string;
  updatedAt?: string;
}

