import React, { useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Badge, Button, Card, Field, Label, Row, Screen, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import { getFriendlyErrorMessage } from '../utils/errors';
import { formatMoney, round2 } from '../utils/format';

export function IssueLoanScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const memberId = route.params.memberId as string;
  const groupId = route.params.groupId as string | undefined;
  const onDone = route?.params?.onDone as undefined | (() => void);

  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingContext, setLoadingContext] = useState(false);

  const [availableToLend, setAvailableToLend] = useState<number | null>(null);
  const [memberUnpaidPrincipal, setMemberUnpaidPrincipal] = useState<number | null>(null);

  useEffect(() => {
    async function loadContext() {
      if (!token) return;
      setLoadingContext(true);
      try {
        const [memberDetail, dashOrGroup] = await Promise.all([
          api.members.get(token, memberId),
          groupId
            ? (async () => {
                try {
                  return await api.groups.dashboard(token, groupId);
                } catch {
                  return await api.groups.get(token, groupId);
                }
              })()
            : Promise.resolve(null),
        ]);

        const principalRemaining = memberDetail?.loan?.principalRemaining;
        setMemberUnpaidPrincipal(typeof principalRemaining === 'number' ? round2(principalRemaining) : 0);

        const candidate = dashOrGroup as any;
        const availableRaw =
          candidate?.availableGroupBalance ??
          candidate?.availableBalance ??
          candidate?.availableToLend ??
          candidate?.available ??
          candidate?.summary?.availableBalance;
        setAvailableToLend(typeof availableRaw === 'number' ? round2(availableRaw) : null);
      } catch {
        // Keep UI usable even if context fetch fails.
      } finally {
        setLoadingContext(false);
      }
    }

    loadContext();
  }, [token, memberId, groupId]);

  const parsedAmount = useMemo(() => {
    const cleaned = amount.replace(/[^0-9.]/g, '');
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }, [amount]);

  const canIssue = useMemo(() => {
    if (busy) return false;
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) return false;
    if (typeof availableToLend === 'number' && parsedAmount > availableToLend) return false;
    return true;
  }, [busy, parsedAmount, availableToLend]);

  async function onIssue() {
    if (!token) return;

    const cleaned = amount.replace(/[^0-9.]/g, '');
    const n = Number(cleaned);

    if (!Number.isFinite(n) || n <= 0) {
      Alert.alert(t('loan.invalidAmount.title'), t('loan.invalidAmount.message'));
      return;
    }

    if (typeof availableToLend === 'number' && n > availableToLend) {
      Alert.alert(t('loan.tooMuch.title'), t('loan.tooMuch.message', { max: availableToLend }));
      return;
    }

    try {
      setBusy(true);
      await api.loans.issue(token, { memberId, amount: n });
      onDone?.();
      navigation.goBack();
    } catch (e: any) {
      const msg = getFriendlyErrorMessage({ error: e, t });
      // Keep the explicit business rule title/message (more user-friendly)
      if (String((e as any)?.message ?? '').includes('INSUFFICIENT_GROUP_BALANCE')) {
        Alert.alert(t('loan.notEnoughMoney.title'), t('loan.notEnoughMoney.message'));
        return;
      }
      Alert.alert(t('common.error'), msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <AppBar title={t('loan.give.title')} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('loan.details.title')}</Text>
            <Badge label={loadingContext ? t('common.loading') : t('common.ready')} tone={loadingContext ? 'muted' : 'success'} />
          </View>

          <View style={{ height: 12 }} />

          <Row left={t('loan.moneyAvailable')} right={typeof availableToLend === 'number' ? formatMoney(availableToLend, { decimals: 2 }) : '—'} />
          <Row left={t('loan.memberLoanPending')} right={typeof memberUnpaidPrincipal === 'number' ? formatMoney(memberUnpaidPrincipal, { decimals: 2 }) : '—'} />

          <View style={{ height: theme.spacing.lg }} />

          <SectionTitle>{t('loan.amountSection')}</SectionTitle>
          <Label>{t('loan.amount')}</Label>
          <Field
            value={amount}
            onChangeText={(tt) => setAmount(tt.replace(/[^0-9.]/g, ''))}
            placeholder={
              typeof availableToLend === 'number'
                ? t('loan.placeholder.upTo', { max: availableToLend })
                : t('loan.placeholder.enter')
            }
            keyboardType="numeric"
          />

          {typeof availableToLend === 'number' && Number.isFinite(parsedAmount) && parsedAmount > 0 ? (
            <Text style={{ marginTop: 10, color: theme.colors.textMuted, fontWeight: '700' }}>
              {t('loan.afterGiving')}{' '}
              <Text style={{ color: theme.colors.text, fontWeight: '900' }}>{formatMoney(round2(Math.max(0, availableToLend - parsedAmount)), { decimals: 2 })}</Text>
            </Text>
          ) : null}

          <View style={{ marginTop: theme.spacing.md }}>
            <Button title={busy ? t('common.loading') : t('loan.give.title')} disabled={!canIssue} onPress={onIssue} />
            <Button title={t('common.back')} variant="secondary" disabled={busy} onPress={() => navigation.goBack()} />
          </View>
        </Card>
      </KeyboardAvoidingView>
    </Screen>
  );
}
