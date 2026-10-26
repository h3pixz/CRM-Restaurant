# TASK — Restaurant CRM

Живой чек-лист проекта. После каждой выполненной задачи отмечать её `[x]`
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

- [ ] Установить `@tanstack/react-router`, `@tanstack/react-query`, `firebase`
- [ ] Настроить `QueryClient` и провайдеры в `src/app/`
- [ ] Настроить Firebase из env (`src/lib/firebase.ts`), валидация переменных
- [ ] Создать роуты и общий layout для всех разделов
- [ ] Заменить ссылки sidebar на типизированные `Link` с активным состоянием
- [ ] Сервис сотрудников: `features/employees/api` — Firestore → `Employee`
- [ ] Заменить мок-данные на `useQuery`; loading / error / empty состояния
- [ ] Реализовать фильтрацию и поиск по таблице
- [ ] Реализовать действия View и Bonus (мутация бонуса)

## 4. Остальные экраны

- [ ] Home
- [ ] Shift
- [ ] Payroll
- [ ] Tasks
- [ ] Analytics
- [ ] Vacation
- [ ] Sick days

## 5. WebSocket-чат

- [ ] Модуль соединения с `wss://ws.ifelse.io`: connecting / connected / disconnected / error / reconnecting
- [ ] UI чата и история сообщений
- [ ] Интеграция чата в приложение

## 6. Качество и релиз

- [ ] Заменить favicon на бренд проекта
- [ ] Проверить responsive всех экранов
- [ ] Прогнать build + lint + Lighthouse (цель из `CLAUDE.md`)
- [ ] Настроить деплой (Firebase Hosting)
- [ ] Обновить README

## Блокеры

- [ ] Получить HTML-макеты остальных экранов (нужны для раздела 4)

## Известные нюансы

- shadcn CLI на Windows кладёт файлы в `@\` и импортирует `cn` из npm:
  после `shadcn add` переносить файлы в `src/` и чинить импорт на `@/lib/utils`.
- Таблица Employees работает на типизированных мок-данных до этапа 3.
