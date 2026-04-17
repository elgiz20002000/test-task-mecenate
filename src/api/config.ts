
const DEFAULT_BASE_URL = 'https://k8s.mectest.ru/test-app';
const DEFAULT_TOKEN = '550e8400-e29b-41d4-a716-446655440000';

export const apiConfig = {
  baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || DEFAULT_BASE_URL,
  token: process.env.EXPO_PUBLIC_API_TOKEN?.trim() || DEFAULT_TOKEN,
} as const;
