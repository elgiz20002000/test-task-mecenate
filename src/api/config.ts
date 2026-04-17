/**
 * Resolves a required Expo public env var or throws with an actionable message.
 */
function readRequiredEnv(name: 'EXPO_PUBLIC_API_BASE_URL' | 'EXPO_PUBLIC_API_TOKEN', value: string | undefined): string {
  const trimmed = value?.trim() ?? '';
  if (trimmed.length === 0) {
    throw new Error(
      `Missing required environment variable ${name}. Copy .env.example to .env, set ${name}, then restart Metro.`,
    );
  }
  return trimmed;
}

/** Resolved API base URL and auth token from the environment (no fallbacks). */
export const apiConfig = {
  baseUrl: readRequiredEnv('EXPO_PUBLIC_API_BASE_URL', process.env.EXPO_PUBLIC_API_BASE_URL),
  token: readRequiredEnv('EXPO_PUBLIC_API_TOKEN', process.env.EXPO_PUBLIC_API_TOKEN),
} as const;
