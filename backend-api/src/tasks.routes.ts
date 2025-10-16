import { Router } from 'express';
import { tasksController } from './controllers/tasks.controller.js';
const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da tarefa
 *         title:
 *           type: string
 *           description: Título da tarefa
 *         completed:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Data de vencimento (formato YYYY-MM-DD)
 *         priority:
 *           type: string
 *           enum: [baixa, média, alta, urgente]
 *           description: Prioridade da tarefa
 *       required:
 *         - id
 *         - title
 *         - completed
 */

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Listar todas as tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
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
 *                 description: Título da tarefa
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Data de vencimento (formato YYYY-MM-DD)
 *               priority:
 *                 type: string
 *                 enum: [baixa, média, alta, urgente]
 *                 description: Prioridade da tarefa
 *     responses:
 *       201:
 *         description: Tarefa criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
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
 *                 description: Título da tarefa
 *               completed:
 *                 type: boolean
 *                 description: Status de conclusão da tarefa
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Data de vencimento (formato YYYY-MM-DD)
 *               priority:
 *                 type: string
 *                 enum: [baixa, média, alta, urgente]
 *                 description: Prioridade da tarefa
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
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


