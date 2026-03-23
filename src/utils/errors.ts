import type { Lang } from '../i18n/translations';

export function parseApiErrorMessage(message: string) {
  const m = String(message ?? '');
  const idx = m.indexOf(':');
  if (idx <= 0) return { code: 'UNKNOWN', message: m };
  return { code: m.slice(0, idx).trim(), message: m.slice(idx + 1).trim() };
}

export function isUnauthorizedError(message?: string) {
  const { code } = parseApiErrorMessage(String(message ?? ''));
  return code === 'UNAUTHORIZED' || code === 'INVALID_TOKEN' || code === 'TOKEN_EXPIRED';
}

export function getFriendlyErrorMessage(params: {
  error: unknown;
  t: (key: any, vars?: any) => string;
  lang?: Lang;
}) {
  const { error, t } = params;
  const raw = (error as any)?.message ? String((error as any).message) : '';

  if (!raw) return t('common.error');

  const { code, message } = parseApiErrorMessage(raw);

  // Connectivity / timeout
  if (code === 'REQUEST_FAILED') {
    if (raw.toLowerCase().includes('abort')) return t('error.timeout');
    return t('error.network');
  }

  // Auth
  if (isUnauthorizedError(raw)) return t('error.unauthorized');

  // Business rule mappings
  if (code === 'INSUFFICIENT_GROUP_BALANCE') return t('loan.notEnoughMoney.message');
  if (code === 'DUPLICATE_MEMBER_NAME') return t('member.add.duplicate.message');
  if (code === 'GROUP_LOCKED_ADD_MEMBER') return t('member.add.locked.message');
  if (code === 'NO_MEMBERS_IN_GROUP') return t('dashboard.nextMonth.noMembers');

  // Fallback to server-provided message
  return message || t('common.error');
}
