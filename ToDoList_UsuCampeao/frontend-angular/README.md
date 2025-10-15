# To-Do List (Frontend Angular 19)

Aplicação frontend em Angular 19 (standalone) para gerenciar tarefas (To-Do).

## Abordagem

- Angular 19 com componentes standalone, `HttpClient` provido globalmente.
- Organização por componentes: `TaskList`, `TaskItem` e `TaskForm` (modal) para criar/editar.
- Estilo simples e responsivo usando CSS puro, com tema laranja (`#F07E26`) e branco.
- Serviço `TaskService` centraliza as chamadas HTTP para o back-end.

## Como rodar

1. Instale dependências:
```bash
npm install
```
2. Inicie o servidor de desenvolvimento:
```bash
npm start
```
3. Acesse `http://localhost:4200`.

## Configuração de API

Por padrão, o `TaskService` aponta para `http://localhost:3000/api/tasks`. Ajuste `baseUrl` em `src/app/services/task.service.ts` conforme seu back-end.

## Estrutura principal

- `src/app/components/task-list/task-list.component.ts` — lista, abre modal, integra serviço.
- `src/app/components/task-item/task-item.component.ts` — item com toggle, editar, excluir.
- `src/app/components/task-form/task-form.component.ts` — modal para criar/editar.
- `src/app/services/task.service.ts` — CRUD via `HttpClient`.
- `src/styles.css` — tema e estilos responsivos globais.

## Próximos passos (opcional)

- Validações e feedbacks visuais.
- Filtro e ordenação de tarefas.
- Paginação caso necessário.
