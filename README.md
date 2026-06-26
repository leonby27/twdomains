# Timeweb Домены — панель регистратора (прототип)

Кликабельный референс-прототип панели **domains.timeweb.ru** для передачи разработчикам.
Показывает интерфейс и **пути пользователя** по модели «код-верификации» через ЕСИА.

> Это не production. Данные — моки, бэкенда нет. Цель — зафиксировать экраны, состояния
> и навигацию, а также архитектурный каркас, в который останется «докрутить бизнес-логику и апишку».

## Стек

- **React** + **Vite**
- **FSD** (Feature-Sliced Design) — архитектурный паттерн
- **CSS Modules** — стилизация (глобальные токены — в `app/styles/global.css`)
- **Effector** — бизнес-логика и состояние
- Алиас `@` → `src` (см. `vite.config.js`, `jsconfig.json`)

## Запуск

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # сборка в dist/
npm run preview  # предпросмотр сборки
```

Адаптив: один интерфейс перестраивается под ширину (mobile ↔ desktop), брейкпоинт `760px`.

## Карта путей пользователя (URL = шаг сценария)

```
/login                 Вход — только через Госуслуги (ЕСИА)
   └─ /auth/gosuslugi   Переход на Госуслуги (loginFx), получение профиля
        └─ /home        Главный экран «Мои домены»: фильтр + таблица + генерация кода
             ├─ /domains/:name   Деталь домена
             └─ /code            Генерация кода верификации (TTL 30 мин)
```

## FSD-структура

```
src/
  app/        — точка входа, роутер, гард, layout, глобальные стили, init Effector
  pages/      — login, home, domain-detail, generate-code (композиция, без своей логики)
  widgets/    — header, domains-table (+ $visibleDomains), faq
  features/   — auth-by-gosuslugi, filter-domains-by-reseller, search-domains, generate-code
  entities/   — session, domain, code (модели Effector + UI-кирпичи)
  shared/     — ui (Button, Spinner, Icon), api (мок), config (routes), lib
```

Правило зависимостей: слой импортирует только нижние (`app → pages → widgets → features → entities → shared`).
Кросс-слайсовые связки (после входа → грузим домены) вынесены в `app/model/init.js`.

## Бизнес-логика (Effector)

| Стор/эффект | Слайс | Назначение |
|-------------|-------|-----------|
| `loginFx`, `$user`, `$isAuthed` | `entities/session` | авторизация через ЕСИА |
| `fetchDomainsFx`, `$domains` | `entities/domain` | список доменов |
| `requestCodeFx`, `$code`, `$secondsLeft`, `$expired` | `entities/code` | код + TTL |
| `$reseller`, `resellerSelected` | `features/filter-domains-by-reseller` | фильтр |
| `$query`, `queryChanged` | `features/search-domains` | поиск |
| `$visibleDomains` (`combine`) | `widgets/domains-table` | домены + фильтр + поиск |

## Что осталось разработчикам («докрутить логику и апишку»)

Вся работа с данными изолирована в **`src/shared/api/`** (`sessionApi`, `domainsApi`, `codeApi`) —
сейчас это моки с задержкой. Эффекты Effector (`loginFx`, `fetchDomainsFx`, `requestCodeFx`)
уже завязаны на эти функции, поэтому достаточно:

1. Заменить тело функций в `shared/api/*` на реальные запросы (OAuth ЕСИА, API реселлеров, бэкенд кодов).
2. При необходимости расширить модели Effector (обработка ошибок, повторные запросы, нормализация).
3. Подключить роутинг к реальным экранам/доменам.

## Заметки

- Шрифт макета — **Stem**; файлов нет, поэтому fallback на Inter/system.
- **Clipboard** (`navigator.clipboard`) требует https/localhost — учесть в проде.
- **SPA-роутинг**: при деплое нужен fallback всех путей на `index.html`.
- SVG-ассеты (логотип, Госуслуги, иконки регистраторов) — в `public/`.
```
