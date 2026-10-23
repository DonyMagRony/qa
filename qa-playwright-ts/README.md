# QA: Playwright + TypeScript

UI-тесты для https://practicesoftwaretesting.com (перенос с Python/pytest на TypeScript).

## Запуск

```bash
npm install
npx playwright install chromium

npm test              # все тесты (headless, Chromium)
npm run test:headed   # с окном браузера
npm run test:ui       # UI-режим Playwright
npm run report        # открыть HTML-отчёт
npm run typecheck     # проверка типов
npm run codegen       # codegen с testIdAttribute=data-test
```

Переменные окружения (необязательно): `BASE_URL`, `API_URL`.

## 5 сценариев = 5 файлов

| Файл | Сценарий | Что проверяется |
|---|---|---|
| `tests/register.spec.ts` | Регистрация | Создаётся уникальный аккаунт (email на `Date.now()` + случайный суффикс), редирект на `/auth/login`, новым аккаунтом можно войти. Плюс: пустая форма не отправляется |
| `tests/login.spec.ts` | Логин | Валидные данные -> `/account`; неверный пароль -> ошибка «Invalid email or password», остаёмся на `/auth/login` |
| `tests/buy-product.spec.ts` | Покупка | Поиск -> карточка -> в корзину -> корзина показывает товар и количество 1 -> адрес -> оплата -> «Thanks for your order» |
| `tests/compare-products.spec.ts` | Сравнение | Открываем 2 товара, запоминаем имя и цену, добавляем в сравнение, на странице сравнения ровно 2 товара с теми же именами и ценами |
| `tests/reset-password.spec.ts` | Сброс пароля | Известный email -> сообщение об успехе; невалидный формат и неизвестный email -> ошибка |

## Структура

```
src/
  api/users-api.ts        регистрация пользователя через API (быстрый setup)
  data/user-factory.ts    генерация уникальных пользователей
  pages/                  Page Object для каждой страницы
  fixtures.ts             фикстуры: страницы, registeredUser, loggedInUser
tests/                    5 spec-файлов
playwright.config.ts      baseURL, testIdAttribute=data-test, трейсы/скриншоты при падении
```

Пользователи для логина, сброса пароля и покупки создаются «на лету» через API
(`registeredUser`), поэтому тесты независимы и не зависят от чужих учёток.
Сама форма регистрации проверяется отдельно через UI.

## Особенности сайта, которые учтены

- Атрибут локаторов `data-test` (а не `data-testid`) настроен в конфиге.
- Форма регистрации валидируется на blur; street/city/state обязательны, поэтому тест заполняет их явно (после завершения lookup по индексу).
- Оплата подтверждается двумя кликами по `finish`: «Check payment», затем «Confirm».
- Сравнение хранится в `sessionStorage`, панель со ссылкой «Compare» появляется при 2+ выбранных товарах.
- Сброс пароля на сайте ставит новый пароль `welcome02` (письмо не отправляется), поэтому для него создаётся отдельный пользователь.
