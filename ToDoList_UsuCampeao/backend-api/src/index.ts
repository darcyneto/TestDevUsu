import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import tasksRouter from './tasks.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger (minimal)
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'ToDo API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['src/**/*.ts'],
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes

// Routes
app.use('/api/tasks', tasksRouter);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = typeof err?.status === 'number' ? err.status : 500;
  const message = err?.message ?? 'Erro interno do servidor';
  // Log detalhado no servidor (inclui causa stack se existir)
  console.error('[API ERROR]', { status, message, cause: err?.cause ?? err });
  // Resposta objetiva para o cliente
  res.status(status).json({ error: message });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api/docs`);
});


