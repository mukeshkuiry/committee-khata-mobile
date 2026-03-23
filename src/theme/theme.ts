export const theme = {
  colors: {
    bg: '#0b1220',
    surface: '#0f172a',
    surface2: '#111a2e',
    border: '#1f2a44',
    border2: '#22304f',

    text: '#ffffff',
    textMuted: '#94a3b8',
    textSoft: '#cbd5e1',

    primary: '#4f46e5',
    primary2: '#6366f1',

    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',

    dangerBg: 'rgba(239, 68, 68, 0.14)',
    warningBg: 'rgba(245, 158, 11, 0.14)',
    successBg: 'rgba(34, 197, 94, 0.14)',
    mutedBg: 'rgba(148, 163, 184, 0.10)',
  },
  radii: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  text: {
    title: { fontSize: 22, fontWeight: '800' as const },
    h2: { fontSize: 18, fontWeight: '800' as const },
    body: { fontSize: 14, fontWeight: '600' as const },
    small: { fontSize: 12, fontWeight: '600' as const },
  },
} as const;
