# Mecenate Feed

Expo-приложение (iOS и Android). Веб-сборка в проекте не настраивается.

## Требования

Версии среды должны удовлетворять полю `engines` в `package.json`:

- **Node.js** ≥ 22  
- **npm** ≥ 10  

Для запуска на устройстве: [Expo Go](https://expo.dev/go). Для эмуляции: iOS Simulator или Android Emulator (средства Xcode / Android Studio).

## Установка

```bash
npm install
```

## Переменные окружения

1. Создайте файл `.env` в корне репозитория (рядом с `package.json`).
2. Скопируйте ключи из `.env.example` и подставьте рабочие значения.

```bash
cp .env.example .env
```

Переменные с префиксом `EXPO_PUBLIC_` подхватываются Expo при старте Metro. После правок `.env` полностью перезапустите Metro (остановка процесса и снова `npm start`; при сбоях кэша: `npx expo start --clear`).

| Переменная | Описание |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | Базовый URL API |
| `EXPO_PUBLIC_API_TOKEN` | Bearer-токен в формате UUID |

Значения читаются в `src/api/config.ts`; пустые или отсутствующие переменные приводят к ошибке при загрузке приложения.

## Запуск

Metro и QR-код для Expo Go:

```bash
npm start
```

Запуск в симуляторе или эмуляторе:

```bash
npm run ios
npm run android
```