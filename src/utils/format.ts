export function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatMoney(amount?: number | null, opts?: { withSymbol?: boolean; decimals?: 0 | 2 }) {
  if (amount === null || amount === undefined || !Number.isFinite(Number(amount))) return '—';
  const withSymbol = opts?.withSymbol ?? true;
  const decimals = opts?.decimals ?? 0;

  const n = decimals === 2 ? round2(Number(amount)) : Math.round(Number(amount));
  const formatted = n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return withSymbol ? `₹ ${formatted}` : formatted;
}

export function formatDateTime(iso?: string | number | Date | null, locale = 'en-IN') {
  if (!iso) return '';
  const d = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(locale);
}

export function formatDate(iso?: string | number | Date | null, locale = 'en-IN') {
  if (!iso) return '';
  const d = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(locale);
}
