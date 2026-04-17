import type { ZodSchema } from 'zod';

import { apiConfig } from './config';
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

interface RequestOptions<T> {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  schema: ZodSchema<T>;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: RequestOptions<unknown>['query']): string {
  const base = apiConfig.baseUrl.replace(/\/+$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${base}${suffix}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

export async function request<T>({
  path,
  method = 'GET',
  query,
  body,
  schema,
  signal,
}: RequestOptions<T>): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiConfig.token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload: unknown = null;
  const text = await response.text();
  if (text.length > 0) {
    try {
      payload = JSON.parse(text);
    } catch {
      throw new ApiError('Invalid JSON response from server.', response.status);
    }
  }

  if (!response.ok) {
    const message =
      isApiErrorShape(payload) && payload.error?.message
        ? payload.error.message
        : `Request failed with status ${response.status}`;
    const code = isApiErrorShape(payload) ? payload.error?.code : undefined;
    throw new ApiError(message, response.status, code);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError('Unexpected response shape from server.', response.status);
  }
  return parsed.data;
}

function isApiErrorShape(value: unknown): value is { error?: { message?: string; code?: string } } {
  return typeof value === 'object' && value !== null && 'error' in value;
}
