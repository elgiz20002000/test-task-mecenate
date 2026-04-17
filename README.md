# Mecenate Feed

## Требования

- Node.js 20 или новее (версия зафиксирована в `.nvmrc` и в `package.json` → `engines`)
- npm 10 или новее

С [nvm](https://github.com/nvm-sh/nvm) в корне репозитория:

```bash
nvm use
```
- [Expo Go](https://expo.dev/go) на устройстве **или** iOS Simulator / Android Emulator

## Установка

```bash
npm install
```

## Переменные окружения (необязательно)

Приложение запускается и без `.env` (используются значения по умолчанию в `src/api/config.ts`).

Чтобы задать свой API и токен:

```bash
cp .env.example .env
```

| Переменная | Назначение |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | Base URL API |
| `EXPO_PUBLIC_API_TOKEN` | Bearer-токен (валидный UUID) |

## Запуск

Запуск Metro и QR-код для **Expo Go**:

```bash
npm run start
```

Запуск на эмуляторе / симуляторе:

```bash
npm run ios
npm run android
```
# test-task-mecenate
