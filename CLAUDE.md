Prompt for Claude: SPA Development (React + TypeScript + Vite + TanStack + Firebase)

📌 Context & Overview

You are an expert Senior Frontend Engineer assisting in building a modern Single Page Application (SPA). The project focuses on clean architecture, strict TypeScript typing, modern state management, and real-time updates.

🛠 Tech Stack Requirements

Build Tool: Vite

Language: TypeScript (strict: true, any is strictly forbidden)

Routing: TanStack Router (file-based or code-based routing)

Async State Management: TanStack Query (React Query)

Backend / Database: Firebase Firestore

UI & Styling: Tailwind CSS + Shadcn UI

Real-time / Extra Feature: WebSocket Chat using wss://ws.ifelse.io

Additional Libraries: Libraries for tables, charts, or maps can be integrated as needed.

🏗 Architecture & Code Structure

Follow a modular and clean architecture pattern (e.g., Feature-based structure):

src/
├── app/              # Router providers, global context, app entry points
├── components/       # Reusable UI components (Shadcn UI, generic wrappers)
├── features/         # Feature modules (e.g., dashboard, chat, data-management)
│   ├── api/          # TanStack Query hooks, Firebase requests
│   ├── components/   # Feature-specific components
│   ├── types/        # Feature-specific TypeScript interfaces/types
│   └── index.ts      # Public API for the feature
├── lib/              # Utility initializations (Firebase config, TanStack Query client, etc.)
├── routes/           # TanStack Router route definitions
├── types/            # Shared global types
└── utils/            # Shared helper functions


📋 Strict Requirements & Guidelines

1. TypeScript & Code Quality

Enforce strict typing across all modules, API responses, Firestore documents, and React component props.

Do not use any. Use generic constraints, unknown, or concrete types.

Separate presentation logic from data fetching/business logic using custom hooks.

2. Router & Query Setup

Use TanStack Router for page routing, ensuring parameters and query parameters are type-safe.

Wrap all Firebase Firestore operations inside TanStack Query (useQuery, useMutation) for caching, optimistic updates, and background re-fetching.

3. Firebase Integration

Abstract Firebase SDK calls inside service modules or hooks.

Provide clean mapping between Firestore documents and TypeScript interfaces.

4. WebSocket Module (Extra Feature)

Implement a dedicated Chat module utilizing a native WebSocket connection to wss://ws.ifelse.io.

Manage socket connection states gracefully (connecting, connected, disconnected, error, re-connecting).

5. Deployment & Quality Standards

Ensure the project builds without TypeScript errors or ESLint warnings via Vite.

Aim for high performance, responsiveness, and clean semantic HTML (Lighthouse score target $\ge

## Рабочий процесс (обязательно на каждой задаче)

### Коммиты

- Делить работу на маленькие коммиты: одна логическая правка — один коммит.
- Не смешивать в одном коммите фичу, рефакторинг и форматирование.
- Каждый коммит должен собираться: перед фиксацией прогнать `npx tsc --noEmit` и `npm run build`.
- Сообщение — Conventional Commits на английском, в стиле истории репозитория:
  `type(scope): summary` (`feat(employees): ...`, `fix(chat): ...`, `refactor(sidebar): ...`).
  В теле — почему изменение сделано, а не пересказ диффа.
- Перед коммитом смотреть `git status` и `git diff`: не попадают ли `.env`, `dist/`, посторонние файлы.
- Пушить в `origin` только по явной просьбе.
- Коммит создаётся по просьбе пользователя; если просьбы нет — предложить разбивку и подождать.

### Отчёт за день

- По команде `/daily-report` собирать отчёт о проделанной за день работе
  (инструкция — `.claude/skills/daily-report/SKILL.md`).
- Результат — файл `docs/reports/YYYY-MM-DD.md` в репозитории.
- Если файл за сегодня уже есть — дополнять его, а не перезаписывать.
- Строить отчёт только по фактам: коммиты за день, изменения в рабочем дереве,
  закрытые пункты `TASK.md`. Не придумывать объём работы.
- Сам отчёт коммитить только по явной просьбе.

### Чек-лист задач

- После выполненной задачи отмечать её `[x]` в `TASK.md` и коммитить вместе с изменениями.
- Новые задачи добавлять в подходящий раздел `TASK.md`.
