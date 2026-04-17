# Mecenate Feed

## Требования

- Node.js 20 или новее (см. `.nvmrc` и поле `engines` в `package.json`)
- npm 10 или новее
- [Expo Go](https://expo.dev/go) на устройстве или iOS Simulator / Android Emulator

С [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

## Установка

```bash
npm install
```

## Переменные окружения

Перед запуском приложения необходимо создать файл `.env` в корне репозитория и задать переменные из таблицы ниже. Шаблон: `.env.example`.

```bash
cp .env.example .env
```

Отредактируйте `.env` и укажите актуальные значения. Без этих переменных приложение не стартует.

| Переменная | Описание |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | Базовый URL API |
| `EXPO_PUBLIC_API_TOKEN` | Bearer-токен в формате UUID |

## Запуск

Metro и QR-код для Expo Go:

```bash
npm run start
```

Сборка в эмуляторе или симуляторе:

```bash
npm run ios
npm run android
```
