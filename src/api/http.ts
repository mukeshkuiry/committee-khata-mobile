import { config } from '../utils/config';

export type ApiError = {
  error: {
    message: string;
    code: string;
  };
};

function withTimeout(ms: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { controller, cancel: () => clearTimeout(id) };
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { token?: string | null },
): Promise<T> {
  const url = `${config.API_BASE_URL}${path}`;
  const { controller, cancel } = withTimeout(15000);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.token ? { Authorization: `Bearer ${init.token}` } : {}),
        ...(init?.headers ?? {}),
      },
    });

    const raw = await res.text();
    const data = raw ? (JSON.parse(raw) as unknown) : null;

    if (!res.ok) {
      const message = (data as ApiError | null)?.error?.message ?? 'Something went wrong';
      const code = (data as ApiError | null)?.error?.code ?? 'ERROR_CODE';
      throw new Error(`${code}: ${message}`);
    }

    return data as T;
  } catch (e: any) {
    // If this is already a structured API error, don't wrap it.
    const msg = String(e?.message ?? '');
    if (msg.includes(':')) throw e;

    // React Native often surfaces connectivity/CORS as 'Network request failed'
    const base = msg || 'Network request failed';
    throw new Error(`REQUEST_FAILED: ${base} (${url})`);
  } finally {
    cancel();
  }
}
