import type { Request, Response, NextFunction } from 'express';
import { tasksStore } from '../stores/tasks.store.js';

export class TasksController {
  list = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(tasksStore.list());
    } catch (err) {
      next({ status: 500, message: 'Erro ao listar tarefas', cause: err });
    }
  };

  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, dueDate, priority } = req.body ?? {};
      if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ error: 'title é obrigatório' });
      }
      const task = tasksStore.create({ 
        title: String(title),
        dueDate: dueDate || undefined,
        priority: priority || undefined
      });
      res.status(201).json(task);
    } catch (err) {
      next({ status: 500, message: 'Erro ao criar tarefa', cause: err });
    }
  };

  update = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ error: 'id inválido' });
      }
      const { title, completed, dueDate, priority } = req.body ?? {};
      if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
        return res.status(400).json({ error: 'title inválido' });
      }
      if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'completed deve ser boolean' });
      }
      const task = tasksStore.update(id, { title, completed, dueDate, priority });
      if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
      res.json(task);
    } catch (err) {
      next({ status: 500, message: 'Erro ao atualizar tarefa', cause: err });
    }
  };

  remove = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ error: 'id inválido' });
      }
      const ok = tasksStore.delete(id);
      if (!ok) return res.status(404).json({ error: 'Tarefa não encontrada' });
      res.status(204).send();
    } catch (err) {
      next({ status: 500, message: 'Erro ao excluir tarefa', cause: err });
    }
  };
}

export const tasksController = new TasksController();


