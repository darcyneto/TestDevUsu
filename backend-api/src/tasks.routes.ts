import { Router } from 'express';
import { tasksController } from './controllers/tasks.controller.js';
const router = Router();

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Listar todas as tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get('/', tasksController.list);

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Criar uma nova tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada
 *       400:
 *         description: Dados inválidos
 */
router.post('/', tasksController.create);

/**
 * @openapi
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualizar uma tarefa existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:id', tasksController.update);

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     summary: Excluir uma tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarefa excluída
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', tasksController.remove);

export default router;


