# TASK — Restaurant CRM

Живой чек-лист проекта. Полное ТЗ — `docs/TZ.md`. После каждой выполненной задачи отмечать её `[x]`
в этом файле и коммитить вместе с изменениями. Новые задачи добавлять
в соответствующий раздел.

## 1. Фундамент — готово

- [x] Зафиксировать правила проекта в `CLAUDE.md`
- [x] Включить строгий TypeScript (`strict`, `noUncheckedIndexedAccess`)
- [x] Настроить алиас `@/*`, типизацию `VITE_FIREBASE_*`, `.env.example`
- [x] Подключить Tailwind CSS v4 и shadcn/ui (`button`, `input`, `card`, `badge`, `avatar`)
- [x] Подогнать тему под макет Employees: палитра, радиусы, шрифты Inter + Oswald

## 2. Экран Employees — готово (макет получен)

- [x] Sidebar с навигацией и активным пунктом
- [x] Top bar: заголовок, уведомления, пользователь
- [x] Карточки метрик (All Employees / On Shift / Idle)
- [x] Панель Filters + Search (UI)
- [x] Таблица сотрудников: типы, мок-данные, аватары, бейджи смен, даты
- [x] Сборка `EmployeesPage` и вывод из `App`

## 3. Роутинг и данные (следующий этап)

- [x] Установить `@tanstack/react-router`, `@tanstack/react-query`, `firebase`
- [x] Настроить `QueryClient` и провайдеры в `src/app/`
- [x] Настроить Firebase из env (`src/lib/firebase.ts`), валидация переменных
- [x] Создать роуты и общий layout для всех разделов
- [x] Заменить ссылки sidebar на типизированные `Link` с активным состоянием
- [x] Сервис сотрудников: `features/employees/api` — Firestore → `Employee`
- [x] Заменить мок-данные на `useQuery`; loading / error / empty состояния
- [x] Реализовать фильтрацию и поиск по таблице
- [x] Реализовать действия View и Bonus (мутация бонуса)

## 4. Остальные экраны

- [x] Home: сводка по смене, занятости зала и выручке (`employees`, `tables`, `orders`)
- [x] Restaurants (delivery & pickup): карточки, фильтры и карта на Leaflet (`/restaurants`, вне CRM-лейаута)
- [x] Shift: смены A/B из `employees`, переключение on shift с оптимистичным обновлением
- [x] Payroll: база по смене + бонусы и даты биллинга из `employees`
- [x] Tasks: список задач с фильтрами, поиском и отметкой выполнения (демо-данные)
- [x] Analytics: выручка по категориям, занятость зала и топ столиков (`tables`, `orders`)
- [x] Vacation: заявки на отпуск с одобрением и отклонением (демо-данные)
- [x] Sick days: больничные с отметкой выздоровления (демо-данные)

## 5. WebSocket-чат

- [x] Модуль соединения с `wss://ws.ifelse.io`: connecting / connected / disconnected / error / reconnecting
- [x] UI чата и история сообщений
- [x] Интеграция чата в приложение

## 6. Tables (admin) — готово

- [x] Firestore-сервис: коллекции `tables` и `orders`, мапперы с валидацией
- [x] Хуки `useTablesQuery`, `useTableQuery`, `useTableOrderQuery`
- [x] Экран схемы зала `/tables`: метрики, фильтр, адаптивная сетка
- [x] Экран заказа `/tables/:tableId`: категории, степеры, удаление, итог
- [x] Пункт Tables в навигации и заголовок раздела для вложенного роута
- [x] Вход в админку по логину/паролю: `/login`, защита `/tables` и `/tables/:tableId`
- [x] Отдельный admin-лейаут по макету: тёмный sidebar с Tables / Orders / Statistics,
      заглушки `/orders` и `/statistics`

## 7. Качество и релиз

- [ ] Заменить favicon на бренд проекта
- [ ] Проверить responsive всех экранов на 360/390/768px (план — `docs/TZ.md` §8)
- [ ] Sidebar → drawer на `< lg`, тач-таргеты ≥ 44px
- [ ] Employees: метрики 1 → 2 → 3 колонки, таблица в карточки/локальный скролл
- [ ] Чат: полноэкранная панель на мобиле
- [ ] Прогнать build + lint + Lighthouse (цель из `CLAUDE.md`), mobile-профиль
- [ ] Проверить HTML/CSS валидатором, приложить отчёт по качеству
- [ ] Настроить деплой (Netlify / Vercel / GitHub Pages), ссылка в README
- [ ] Заменить README: функциональность, зависимости, запуск, деплой
- [ ] Проверить, что `.env` не в репозитории, а `.env.example` актуален

## Блокеры

- [x] Получить HTML-макеты остальных экранов — макетов нет, экраны сделаны
      без них в минималистичном стиле существующего приложения
- [x] Разрешить чтение коллекций `tables` и `orders` в Firestore rules
      и добавить тестовые документы (17 столиков, заказ для столика 7)

## Известные нюансы

- shadcn CLI на Windows кладёт файлы в `@\` и импортирует `cn` из npm:
  после `shadcn add` переносить файлы в `src/` и чинить импорт на `@/lib/utils`.
- Firestore-коллекция `employees`: `name`, `email`, `avatarUrl` (опционально),
  `shift` (`'A' | 'B'`), `onShift` (boolean), `employmentDate` / `billingDate`
  (ISO-строка или Timestamp), `bonus` (number). Невалидный документ роняет запрос
  с понятной ошибкой.
- Без `.env` с `VITE_FIREBASE_*` приложение падает на старте: `src/lib/firebase.ts`
  валидирует переменные.
- Firestore-коллекция `tables`: `label` (string или number), `status`
  (`'free' | 'occupied' | 'reserved'`), `reservedAt` (строка вида `'22:30'`,
  опционально, показывается у зарезервированных). Счётчики на экране считаются
  по данным, а не захардкожены.
- Tasks, Vacation и Sick days пока работают на типизированных демо-данных
  (`features/*/data`), действия живут в локальном state; Firestore — отдельная задача.
- Firestore-коллекция `orders`: id документа = id столика, поле `items` — массив
  `{ name, category: 'appetizer' | 'main' | 'drinks' | 'dessert', price,
  quantity, imageUrl?, note? }`. Правки количеств и удаление позиций на экране
  живут в локальном state и в Firestore не пишутся.
