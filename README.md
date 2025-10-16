## TESTEDEVUSU

Monorepo contendo frontend (Angular) e backend (Node/Express) para gerenciamento de tarefas.

### Requisitos
- Node.js 18+
- npm 9+

### Backend (Node/Express)
Local: `backend-api`

Instalar dependências:
```bash
cd backend-api
npm install
```

Executar em desenvolvimento (TS + nodemon):
```bash
npm run dev
```

Build e executar em produção:
```bash
npm run build
npm start
```

Endpoints principais (REST):
- GET `/api/tasks` — lista todas as tarefas
- POST `/api/tasks` — cria nova tarefa `{ title: string }`
- PUT `/api/tasks/:id` — atualiza tarefa `{ title?: string, completed?: boolean }`
- DELETE `/api/tasks/:id` — remove tarefa

Outros:
- GET `/api/health` — healthcheck
- Swagger UI: `http://localhost:3000/api/docs`

Observações:
- Armazenamento em memória (os dados reiniciam ao reiniciar o servidor)
- CORS habilitado por padrão

### Frontend (Angular)
Local: `frontend-angular`

Instalar dependências:
```bash
cd frontend-angular
npm install
```

Executar (dev):
```bash
npm start
```

Por padrão, o frontend consome a API em `http://localhost:3000/api/tasks` (veja `src/app/services/task.service.ts`).

### Estrutura e Boas Práticas
- Código organizado por responsabilidade (rotas no backend, componentes/serviços no frontend)
- Tratamento de erros no backend com middleware de erro
- Documentação via Swagger


