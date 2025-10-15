export type Priority = 'baixa' | 'média' | 'alta' | 'urgente';

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: Priority;
};


