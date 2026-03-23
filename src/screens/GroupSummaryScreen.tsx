import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Badge, Card, ListItem, Screen, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import type { GroupCompletionSummary } from '../types/api';

function money(n: number) {
  return `₹ ${Math.round(n).toLocaleString('en-IN')}`;
}

export function GroupSummaryScreen({ route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const groupId = route.params.groupId as string;

  const [data, setData] = useState<GroupCompletionSummary | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!token) return;
    setBusy(true);
    try {
      const d = await api.groups.summary(token, groupId);
      setData(d);
    } catch (e: any) {
      Alert.alert(t('error.summaryNotAvailable'), e?.message ?? t('common.error'));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, [token, groupId]);

  const tone = useMemo(() => {
    if (!data) return 'muted' as const;
    return data.totals.perMemberProfit >= 0 ? ('success' as const) : ('warning' as const);
  }, [data]);

  return (
    <Screen>
      <AppBar title={t('summary.title')} />

      {!data ? (
        <Text style={{ color: theme.colors.textMuted }}>{busy ? t('common.loading') : t('summary.notReady')}</Text>
      ) : (
        <>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
            <View style={{ flex: 1 }}>
              <Card>
                <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('summary.moneyCollected')}</Text>
                <Text style={{ color: theme.colors.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>{money(data.totals.cashPool)}</Text>
              </Card>
            </View>
            <View style={{ flex: 1 }}>
              <Card>
                <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('summary.eachGets')}</Text>
                <Text style={{ color: theme.colors.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>{money(data.totals.perMemberPayout)}</Text>
              </Card>
            </View>
          </View>

          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('summary.profitPerPerson')}</Text>
                <Text style={{ color: theme.colors.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>{money(data.totals.perMemberProfit)}</Text>
              </View>
              <Badge label={data.totals.perMemberProfit >= 0 ? t('summary.badge.profit') : t('summary.badge.loss')} tone={tone} />
            </View>
            <View style={{ marginTop: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.textMuted }}>
                {t('summary.interest')}: {money(data.totals.totalInterestPaid)} • {t('summary.lateFee')}: {money(data.totals.totalFinePaid)}
              </Text>
            </View>
          </Card>

          <SectionTitle>{t('summary.paymentsPerMember')}</SectionTitle>
          <FlatList
            refreshing={busy}
            onRefresh={load}
            data={data.members}
            keyExtractor={(m) => m.memberId}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                subtitle={t('summary.memberRow.subtitle', { paid: money(item.contributed), profit: money(item.profit) })}
                right={
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: theme.colors.text, fontWeight: '900' }}>{money(item.payout)}</Text>
                    <Text style={{ color: theme.colors.textMuted, marginTop: 4, fontWeight: '800' }}>{t('summary.memberRow.gets')}</Text>
                  </View>
                }
              />
            )}
          />
        </>
      )}
    </Screen>
  );
}
