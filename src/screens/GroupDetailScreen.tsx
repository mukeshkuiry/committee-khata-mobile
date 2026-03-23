import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Badge, Button, Card, ConfirmDialog, IconButton, ListItem, Screen, SearchField, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import type { DashboardRow } from '../types/api';
import { getFriendlyErrorMessage, parseApiErrorMessage } from '../utils/errors';
import { formatDate, formatMoney } from '../utils/format';

type FilterKey = 'all' | 'ok' | 'due' | 'overdue';

export function GroupDetailScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const groupId = route.params.groupId as string;

  const [rows, setRows] = useState<DashboardRow[]>([]);
  const [availableGroupBalance, setAvailableGroupBalance] = useState<number>(0);
  const [busy, setBusy] = useState(false);
  const [groupMeta, setGroupMeta] = useState<{ currentMonth: number; totalMonths: number; createdAt: string } | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const totalDueAll = useMemo(() => rows.reduce((sum, r) => sum + (r.totalDue ?? 0), 0), [rows]);
  const isGroupCompleted = !!groupMeta && groupMeta.currentMonth === groupMeta.totalMonths;
  const isCleared = (totalDueAll ?? 0) === 0;

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((r) => {
      const totalDue = r.totalDue ?? 0;
      const isOverdue = (r.contributionDue ?? 0) > 0;
      const status: FilterKey = totalDue === 0 ? 'ok' : isOverdue ? 'overdue' : 'due';

      if (filter !== 'all' && status !== filter) return false;
      if (q && !String(r.name ?? '').toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, query, filter]);

  const nextMonthConfirm = useMemo(() => {
    const overdueCount = rows.filter((r) => (r.contributionDue ?? 0) > 0).length;
    const dueCount = rows.filter((r) => (r.totalDue ?? 0) > 0).length;

    const lines: string[] = [];
    if (overdueCount > 0) lines.push(`${overdueCount} member(s) have overdue contribution.`);
    if (dueCount > 0) lines.push(`${dueCount} member(s) still have amount to collect.`);

    const hasWarnings = lines.length > 0;
    return {
      hasWarnings,
      message: hasWarnings
        ? `Before creating the next month:\n\n${lines.join('\n')}\n\nCreate next month anyway?`
        : t('dashboard.createNextMonth'),
    };
  }, [rows, t]);

  async function load() {
    if (!token) return;
    setBusy(true);
    try {
      const [dash, group] = await Promise.all([api.groups.dashboard(token, groupId), api.groups.get(token, groupId)]);
      setRows(dash.rows);
      setAvailableGroupBalance(dash.availableGroupBalance);

      setGroupMeta({
        currentMonth: (group as any).currentMonth ?? 0,
        totalMonths: (group as any).totalMonths ?? 0,
        createdAt: String((group as any).createdAt ?? ''),
      });
    } catch (e: any) {
      Alert.alert(t('common.error'), getFriendlyErrorMessage({ error: e, t }));
    } finally {
      setBusy(false);
    }
  }

  async function createNextMonthConfirmed() {
    if (!token) return;
    try {
      setConfirmOpen(false);
      setBusy(true);
      await api.groups.members.createMonth(token, groupId);
      await load();
      Alert.alert(t('dashboard.createNextMonth.successTitle'), t('dashboard.createNextMonth.successMessage'));
    } catch (e: any) {
      const msg = String(e?.message ?? '');
      const parsed = parseApiErrorMessage(msg);
      if (parsed.code === 'NEXT_MONTH_NOT_ALLOWED_TODAY') {
        Alert.alert(t('common.error'), parsed.message || getFriendlyErrorMessage({ error: e, t }));
      } else {
        Alert.alert(t('common.error'), getFriendlyErrorMessage({ error: e, t }));
      }
    } finally {
      setBusy(false);
    }
  }

  function requestCreateNextMonth() {
    if (busy) return;

    if (groupMeta?.createdAt) {
      const base = new Date(groupMeta.createdAt);

      const next = new Date(base);
      const offsetMonths = groupMeta.currentMonth ?? 1;
      next.setMonth(base.getMonth() + offsetMonths);

      const now = new Date();

      const start = new Date(next);
      start.setDate(start.getDate() - 2);
      start.setHours(0, 0, 0, 0);

      const end = new Date(next);
      end.setDate(end.getDate() + 2);
      end.setHours(23, 59, 59, 999);

      const withinWindow = now >= start && now <= end;

      if (!withinWindow) {
        Alert.alert(
          t('common.error'),
          t('dashboard.nextMonth.allowedWindow', {
            target: formatDate(next),
            start: formatDate(start),
            end: formatDate(end),
          }),
        );
        return;
      }
    }

    setConfirmOpen(true);
  }

  useEffect(() => {
    load();
  }, [token, groupId]);

  function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: active ? theme.colors.surface : theme.colors.surface2,
            borderWidth: 1,
            borderColor: active ? theme.colors.border : theme.colors.border2,
          },
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={{ color: active ? theme.colors.text : theme.colors.textMuted, fontWeight: '900', fontSize: 12 }}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Screen>
      <AppBar
        title={t('dashboard.title')}
        right={!isGroupCompleted ? <IconButton label={busy ? '…' : '+'} onPress={requestCreateNextMonth} /> : undefined}
      />

      <ConfirmDialog
        open={confirmOpen}
        title={t('dashboard.createNextMonth.confirmTitle')}
        message={nextMonthConfirm.message}
        confirmText={t('dashboard.createNextMonth.confirmText')}
        cancelText={t('common.cancel')}
        tone={nextMonthConfirm.hasWarnings ? 'danger' : 'warning'}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={createNextMonthConfirmed}
      />

      {/* Stats */}
      <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
        <View style={{ flex: 1 }}>
          <Card>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('dashboard.availableToLend')}</Text>
            <Text style={{ color: theme.colors.success, fontWeight: '900', fontSize: 18, marginTop: 6 }}>{formatMoney(availableGroupBalance)}</Text>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <Card>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('dashboard.amountToCollect')}</Text>
            <Text
              style={{
                color: totalDueAll > 0 ? theme.colors.warning : theme.colors.text,
                fontWeight: '900',
                fontSize: 18,
                marginTop: 6,
              }}
            >
              {formatMoney(totalDueAll)}
            </Text>
          </Card>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
        <View style={{ flex: 1 }}>
          <Card>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('dashboard.month')}</Text>
            <Text style={{ color: theme.colors.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>
              {groupMeta ? `${groupMeta.currentMonth}/${groupMeta.totalMonths}` : '—'}
            </Text>
          </Card>
        </View>

        <View style={{ flex: 1 }}>
          <Pressable onPress={() => navigation.navigate('Members', { groupId })} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
            <Card>
              <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('dashboard.members')}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <Text style={{ color: theme.colors.text, fontWeight: '900', fontSize: 18 }}>{rows.length}</Text>
                <Text style={{ color: theme.colors.textMuted, fontWeight: '900', fontSize: 20 }}>›</Text>
              </View>
            </Card>
          </Pressable>
        </View>
      </View>

      {isGroupCompleted && isCleared ? (
        <View style={{ marginBottom: theme.spacing.sm }}>
          <Button title={t('dashboard.viewCompletionSummary')} onPress={() => navigation.navigate('GroupSummary', { groupId })} />
        </View>
      ) : null}

      <SectionTitle>{t('dashboard.members.section')}</SectionTitle>

      <View style={{ marginBottom: theme.spacing.sm }}>
        <SearchField value={query} onChangeText={setQuery} placeholder={t('common.search')} />
      </View>

      <View style={{ flexDirection: 'row', gap: theme.spacing.xs, flexWrap: 'wrap', marginBottom: theme.spacing.md }}>
        <FilterChip label={t('dashboard.filters.all')} active={filter === 'all'} onPress={() => setFilter('all')} />
        <FilterChip label={t('dashboard.filters.clear')} active={filter === 'ok'} onPress={() => setFilter('ok')} />
        <FilterChip label={t('dashboard.filters.pending')} active={filter === 'due'} onPress={() => setFilter('due')} />
        <FilterChip label={t('dashboard.filters.overdue')} active={filter === 'overdue'} onPress={() => setFilter('overdue')} />
      </View>

      <FlatList
        refreshing={busy}
        onRefresh={load}
        data={filteredRows}
        keyExtractor={(r) => r.memberId}
        renderItem={({ item }) => {
          const contribution = item.contributionDue ?? 0;
          const fine = item.fine ?? 0;
          const interest = item.loan?.interest ?? 0;
          const principal = item.loan?.principal ?? 0;

          const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
          const overdue = round2(contribution + fine + interest);
          const totalPayable = round2(overdue + principal);

          const isOk = totalPayable <= 0;
          const isOverdue = overdue > 0;

          const tone = isOk ? 'success' : isOverdue ? 'danger' : 'warning';
          const label = isOk ? t('dashboard.status.ok') : isOverdue ? t('dashboard.status.overdue') : t('dashboard.status.due');

          return (
            <ListItem
              title={item.name}
              subtitle={t('dashboard.memberRow.subtitle', { min: overdue, total: totalPayable })}
              right={
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                  <Badge label={label} tone={tone as any} />
                  <Text style={{ color: theme.colors.textMuted, fontWeight: '900', fontSize: 20 }}>›</Text>
                </View>
              }
              onPress={() => navigation.navigate('MemberDetail', { memberId: item.memberId, groupId })}
            />
          );
        }}
        ListEmptyComponent={<Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>{t('members.empty.none')}</Text>}
      />
    </Screen>
  );
}
