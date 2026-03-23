import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Badge, Button, Card, ListItem, Screen, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import type { LoanIssue, Payment } from '../types/api';
import { getFriendlyErrorMessage } from '../utils/errors';
import { formatDateTime, formatMoney, round2 } from '../utils/format';

type TabKey = 'payments' | 'loan';

function SegTab({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 8,
          borderRadius: 999,
          backgroundColor: active ? theme.colors.surface : 'transparent',
          borderWidth: 1,
          borderColor: active ? theme.colors.border2 : 'transparent',
        }}
      >
        <Text style={{ textAlign: 'center', color: active ? theme.colors.text : theme.colors.textMuted, fontWeight: '900', fontSize: 13 }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export function MemberDetailScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const memberId = route.params.memberId as string;

  const [detail, setDetail] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loans, setLoans] = useState<LoanIssue[]>([]);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<TabKey>('payments');

  const summary = useMemo(() => {
    const contributionDue = detail?.contribution?.totalDue ?? 0;
    const fine = detail?.fine ?? 0;
    const interest = detail?.loan?.unpaidInterest ?? 0;
    const principal = detail?.loan?.principalRemaining ?? 0;

    const overdue = contributionDue + fine + interest;
    const totalPayable = overdue + principal;

    const overdueR = round2(overdue);
    const totalPayableR = round2(totalPayable);

    return {
      name: detail?.name ?? t('member.title'),
      contributionDue: round2(contributionDue),
      fine: round2(fine),
      interest: round2(interest),
      principal: round2(principal),
      overdue: overdueR,
      totalPayable: totalPayableR,
      status:
        totalPayableR <= 0
          ? ({ label: t('dashboard.status.ok'), tone: 'success' } as const)
          : overdueR > 0
            ? ({ label: t('dashboard.status.overdue'), tone: 'danger' } as const)
            : ({ label: t('dashboard.status.due'), tone: 'warning' } as const),
    };
  }, [detail, t]);

  const loanSummary = useMemo(() => {
    const principalRemaining = detail?.loan?.principalRemaining ?? 0;
    const unpaidInterest = detail?.loan?.unpaidInterest ?? 0;
    return { principalRemaining: round2(principalRemaining), unpaidInterest: round2(unpaidInterest) };
  }, [detail]);

  async function load() {
    if (!token) return;
    setBusy(true);
    try {
      const d = await api.members.get(token, memberId);
      const p = await api.members.payments(token, memberId);
      const l = await api.members.loans(token, memberId);
      setDetail(d);
      setPayments(p);
      setLoans(l);
    } catch (e: any) {
      Alert.alert(t('common.error'), getFriendlyErrorMessage({ error: e, t }));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, [token, memberId]);

  const listData = tab === 'payments' ? (payments as any[]) : (loans as any[]);

  const listHeader = useMemo(() => {
    return (
      <>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('member.totalToPay')}</Text>
              <Text
                style={{
                  color: summary.totalPayable > 0 ? theme.colors.warning : theme.colors.text,
                  fontWeight: '900',
                  fontSize: 20,
                  marginTop: 4,
                }}
              >
                {formatMoney(summary.totalPayable, { decimals: 2 })}
              </Text>
            </View>
            <Badge label={summary.status.label} tone={summary.status.tone} />
          </View>

          <View style={{ height: 10 }} />

          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: theme.colors.surface2,
                  borderWidth: 1,
                  borderColor: theme.colors.border2,
                  borderRadius: theme.radii.md,
                  padding: 10,
                }}
              >
                <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('member.minimumToPay')}</Text>
                <Text style={{ color: theme.colors.textMuted, fontWeight: '700', marginTop: 1, fontSize: 12 }}>{t('member.pendingHint')}</Text>
                <Text
                  style={{
                    color: summary.overdue > 0 ? theme.colors.danger : theme.colors.text,
                    fontWeight: '900',
                    fontSize: 16,
                    marginTop: 6,
                  }}
                >
                  {formatMoney(summary.overdue, { decimals: 2 })}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: theme.colors.surface2,
                  borderWidth: 1,
                  borderColor: theme.colors.border2,
                  borderRadius: theme.radii.md,
                  padding: 10,
                }}
              >
                <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('member.loanPending')}</Text>
                <Text style={{ color: theme.colors.textMuted, fontWeight: '700', marginTop: 1, fontSize: 12 }}>{t('member.principalHint')}</Text>
                <Text
                  style={{
                    color: summary.principal > 0 ? theme.colors.warning : theme.colors.text,
                    fontWeight: '900',
                    fontSize: 16,
                    marginTop: 6,
                  }}
                >
                  {formatMoney(summary.principal, { decimals: 2 })}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 12 }} />

          <Text style={{ color: theme.colors.textSoft, fontWeight: '800' }}>{t('member.breakdown')}</Text>
          <View style={{ height: 8 }} />

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
            {(
              [
                {
                  label: t('member.breakdown.contribution'),
                  hint: t('member.breakdown.hint.overdue'),
                  value: summary.contributionDue,
                  tone: summary.contributionDue > 0 ? 'danger' : 'muted',
                },
                {
                  label: t('member.breakdown.interest'),
                  hint: t('member.breakdown.hint.overdue'),
                  value: summary.interest,
                  tone: summary.interest > 0 ? 'danger' : 'muted',
                },
                {
                  label: t('member.breakdown.fine'),
                  hint: t('member.breakdown.hint.overdue'),
                  value: summary.fine,
                  tone: summary.fine > 0 ? 'danger' : 'muted',
                },
                {
                  label: t('member.breakdown.principal'),
                  hint: t('member.breakdown.hint.normal'),
                  value: summary.principal,
                  tone: summary.principal > 0 ? 'warning' : 'muted',
                },
              ] as const
            ).map((x) => (
              <View
                key={x.label}
                style={{
                  minWidth: 150,
                  flexGrow: 1,
                  backgroundColor: theme.colors.surface2,
                  borderWidth: 1,
                  borderColor: theme.colors.border2,
                  borderRadius: theme.radii.md,
                  padding: 10,
                }}
              >
                <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{x.label}</Text>
                <Text style={{ color: theme.colors.textMuted, fontWeight: '700', marginTop: 1, fontSize: 12 }}>{x.hint}</Text>
                <Text
                  style={{
                    color: x.tone === 'danger' ? theme.colors.danger : x.tone === 'warning' ? theme.colors.warning : theme.colors.text,
                    fontWeight: '900',
                    fontSize: 15,
                    marginTop: 6,
                  }}
                >
                  {formatMoney(x.value, { decimals: 2 })}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
          <View style={{ flex: 1 }}>
            <Button
              title={summary.totalPayable > 0 ? t('member.addPayment') : t('member.nothingPending')}
              disabled={busy || summary.totalPayable <= 0}
              onPress={() =>
                navigation.navigate('AddPayment', {
                  memberId,
                  due: summary.totalPayable,
                  overdue: summary.overdue,
                  onDone: load,
                })
              }
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title={t('loan.give.title')}
              variant="secondary"
              disabled={busy}
              onPress={() => navigation.navigate('IssueLoan', { memberId, groupId: route.params.groupId, onDone: load })}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: theme.spacing.xs,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.sm,
            padding: 6,
            borderRadius: 999,
            backgroundColor: theme.colors.surface2,
            borderWidth: 1,
            borderColor: theme.colors.border2,
          }}
        >
          <SegTab
            active={tab === 'payments'}
            label={`${t('member.tabs.payments')} (${payments.length})`}
            onPress={() => setTab('payments')}
          />
          <SegTab active={tab === 'loan'} label={`${t('member.tabs.loan')} (${loans.length})`} onPress={() => setTab('loan')} />
        </View>

        {tab === 'loan' ? (
          <>
            <SectionTitle>{t('member.loan.summaryTitle')}</SectionTitle>
            <Card>
              <Text style={{ color: theme.colors.textMuted, fontWeight: '700' }}>{t('member.loan.principalRemaining')}</Text>
              <Text style={{ color: theme.colors.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>
                {formatMoney(loanSummary.principalRemaining, { decimals: 2 })}
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontWeight: '700', marginTop: 10 }}>{t('member.loan.unpaidInterest')}</Text>
              <Text style={{ color: theme.colors.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>
                {formatMoney(loanSummary.unpaidInterest, { decimals: 2 })}
              </Text>
            </Card>
            <View style={{ height: theme.spacing.sm }} />
          </>
        ) : null}

        <SectionTitle>{tab === 'payments' ? t('member.payments.title') : t('member.loan.historyTitle')}</SectionTitle>
      </>
    );
  }, [
    t,
    summary,
    loanSummary,
    tab,
    payments.length,
    loans.length,
    busy,
    memberId,
    navigation,
    route.params.groupId,
  ]);

  return (
    <Screen>
      <AppBar title={summary.name} />

      <FlatList
        keyboardShouldPersistTaps="handled"
        data={listData}
        keyExtractor={(item) => item.id}
        refreshing={busy}
        onRefresh={load}
        ListHeaderComponent={listHeader}
        renderItem={({ item }) => {
          if (tab === 'payments') {
            const p = item as Payment;
            const when = formatDateTime(p.createdAt);
            return (
              <ListItem
                title={formatMoney(p.amount, { decimals: 2 })}
                subtitle={`Month ${p.month}${when ? ` • ${when}` : ''}`}
                right={<Text style={{ color: theme.colors.textMuted, fontWeight: '900' }}>›</Text>}
              />
            );
          }

          const l = item as LoanIssue;
          return (
            <ListItem
              title={formatMoney(l.amount, { decimals: 2 })}
              subtitle={`Month ${l.month}${formatDateTime(l.createdAt) ? ` • ${formatDateTime(l.createdAt)}` : ''}`}
            />
          );
        }}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            {tab === 'payments' ? t('member.payments.empty') : t('member.loan.empty')}
          </Text>
        }
        ListFooterComponent={<View style={{ height: theme.spacing.md }} />}
      />
    </Screen>
  );
}
