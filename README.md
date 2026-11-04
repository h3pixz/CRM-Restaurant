# Restaurant CRM

SPA для управления рестораном: сотрудники и смены, бонусы и payroll, задачи, аналитика
зала и выручки, отпуска и больничные, схема зала с заказами, а также live-чат команды
по WebSocket.

Приложение собрано на React 19 + TypeScript в строгом режиме, TanStack Router и TanStack
Query, данные — Firebase Firestore, стили — Tailwind CSS v4 и shadcn/ui, карта ресторанов —
Leaflet.

**Демо:** https://crm-restaurant-tawny.vercel.app/

## Возможности

### CRM

- **Home** — сводка по смене, занятость зала и выручка.
- **Shift** — сотрудники смен A/B, переключение статуса on shift с оптимистичным обновлением.
- **Payroll** — базовая ставка по смене, бонусы и даты биллинга.
- **Employees** — таблица сотрудников с фильтрами и поиском, метрики, начисление бонуса.
- **Tasks** — задачи с категориями, приоритетами, фильтрами и отметкой выполнения.
- **Analytics** — выручка по категориям, занятость зала, топ столиков.
- **Vacation** — заявки на отпуск с одобрением и отклонением.
- **Sick days** — больничные с отметкой выздоровления.
- **Chat** — чат через WebSocket с состояниями соединения
  (connecting / connected / disconnected / error / reconnecting).

### Admin (отдельный лейаут)

- **Tables** — схема зала: метрики, фильтр по статусу, адаптивная сетка.
- **Table order** — заказ для столика: категории блюд, изменение количеств, удаление
  позиций, итог.
- **Orders** — метрики по текущим чекам и список заказов с переходом к столику.
- **Statistics** — выручка по категориям, занятость зала и топ столиков.
- Доступ к `/tables` и `/tables/:tableId` закрыт демо-авторизацией по логину и паролю.

### Restaurants

Отдельная страница `/restaurants` вне CRM-лейаута: карточки доставки и самовывоза,
фильтры и карта на Leaflet.

### Адаптивность

Все экраны проверены на 360/390/768px: sidebar превращается в drawer, таблицы —
в карточки или локальный скролл, чат занимает полный экран, тач-таргеты не меньше 44px.

## Стек

| Слой | Технологии |
| --- | --- |
| Сборка | Vite, TypeScript (`strict`, `noUncheckedIndexedAccess`, без `any`) |
| UI | React 19, Tailwind CSS v4, shadcn/ui, lucide-react |
| Роутинг | TanStack Router |
| Данные | TanStack Query, Firebase Firestore (Firestore Lite) |
| Карта | Leaflet + react-leaflet |
| Чат | нативный WebSocket, `wss://ws.ifelse.io` |

## Быстрый старт

Требуется Node.js 20.19+ (или 22.12+) и проект Firebase с включённым Firestore.

```bash
npm install
cp .env.example .env   # заполнить переменные Firebase
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Без `.env` приложение падает на старте: `src/lib/firebase.ts` валидирует переменные
окружения и выводит понятную ошибку.

### Переменные окружения

| Переменная | Откуда взять |
| --- | --- |
| `FIREBASE_API_KEY` | Firebase Console → Project settings → Your apps |
| `FIREBASE_AUTH_DOMAIN` | там же |
| `FIREBASE_PROJECT_ID` | там же |
| `FIREBASE_STORAGE_BUCKET` | там же |
| `FIREBASE_MESSAGING_SENDER_ID` | там же |
| `FIREBASE_APP_ID` | там же |

`.env` в репозиторий не коммитится, актуальный перечень переменных — `.env.example`.

## Firestore

Коллекции: `employees`, `tables`, `orders`, `tasks`, `vacationRequests`, `sickDays`,
`restaurants`. Документы маппятся в типизированные модели; невалидный документ
роняет запрос с понятной ошибкой.

Для чтения данных приложению нужны соответствующие правила. Правила для демо-проекта:

```
match /employees/{employeeId} { allow read, write: if true; }
match /tables/{tableId} { allow read: if true; }
match /orders/{tableId} { allow read: if true; }
match /restaurants/{restaurantId} { allow read: if true; }
match /tasks/{taskId} { allow read, write: if true; }
match /vacationRequests/{requestId} { allow read, write: if true; }
match /sickDays/{recordId} { allow read, write: if true; }
```

Демо-данные для `tasks`, `vacationRequests` и `sickDays` заливаются сид-скриптом
(нужны права на запись в эти коллекции):

```bash
npm run seed
```

## Скрипты

| Команда | Действие |
| --- | --- |
| `npm run dev` | Запуск dev-сервера Vite |
| `npm run build` | Проверка типов (`tsc -b`) и production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр production-сборки |
| `npm run lint` | ESLint по всему проекту |
| `npm run seed` | Заполнение Firestore демо-данными из `.env` |

## Структура проекта

```
src/
├── app/          # провайдеры, QueryClient, роутер, навигация
├── components/   # общие компоненты и shadcn/ui
├── features/     # фичи: employees, tables, chat, analytics, ...
├── lib/          # инициализация Firebase, утилиты
├── routes/       # определение роутов TanStack Router
├── types/        # общие типы
└── utils/        # хелперы
```

Каждая фича хранит `api` (сервисы Firestore и хуки TanStack Query), `components`,
`types` и публичный `index.ts`.

## Авторизация админки

`/login` открывает доступ к админ-разделу. Демо-доступ: логин `admin`, пароль `admin`.
Сессия живёт в `sessionStorage` текущей вкладки — это клиентское ограничение демо-стенда,
а не полноценная аутентификация.

## Деплой

Проект разворачивается на Vercel как статическая SPA:

- Build command: `npm run build`
- Output directory: `dist`
- Переменные `FIREBASE_*` задаются в Project Settings → Environment Variables.

SPA-роутинг требует rewrite всех путей на `index.html` (конфигурация — `vercel.json`).
Для GitHub Pages дополнительно понадобились бы `base` в Vite и fallback через `404.html`.

## Документация

- `docs/TZ.md` — техническое задание и критерии готовности.
- `TASK.md` — живой чек-лист проекта.
- `CLAUDE.md` — правила разработки в репозитории.
