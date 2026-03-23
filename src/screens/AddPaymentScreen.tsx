import { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Badge, Button, Card, Field, Label, Screen } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import { getFriendlyErrorMessage } from '../utils/errors';
import { formatMoney, round2 } from '../utils/format';

function QuickChip({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        {
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 999,
          backgroundColor: theme.colors.surface2,
          borderWidth: 1,
          borderColor: theme.colors.border2,
        },
        pressed && { opacity: 0.78 },
      ]}
    >
      <Text style={{ color: theme.colors.text, fontWeight: '900' }}>{label}</Text>
    </Pressable>
  );
}

export function AddPaymentScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const memberId = route.params.memberId as string;
  const due = (route.params?.due as number | undefined) ?? undefined;
  const overdue = (route.params?.overdue as number | undefined) ?? undefined;
  const onDone = route?.params?.onDone as undefined | (() => void);

  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [selectedQuick, setSelectedQuick] = useState<'due' | 'overdue' | null>(null);

  const dueNum = typeof due === 'number' && Number.isFinite(due) ? round2(due) : undefined;
  const overdueNum = typeof overdue === 'number' && Number.isFinite(overdue) ? Math.max(0, round2(overdue)) : 0;

  const totalPayableNum = dueNum;
  const minimumPayableNum = overdueNum;

  const maxAllowed = useMemo(() => {
    if (typeof totalPayableNum !== 'number') return undefined;
    if (selectedQuick === 'overdue') return minimumPayableNum;
    return totalPayableNum;
  }, [totalPayableNum, selectedQuick, minimumPayableNum]);

  const helper = useMemo(() => {
    if (typeof dueNum !== 'number') return t('payment.helper.typeAmount');
    if (dueNum <= 0) return t('payment.helper.nothingPending');
    return t('payment.helper.tapToFill');
  }, [dueNum, t]);

  const parsedAmount = useMemo(() => {
    const cleaned = amount.replace(/[^0-9.]/g, '');
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }, [amount]);

  const canSave = useMemo(() => {
    if (busy) return false;
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) return false;
    if (typeof maxAllowed === 'number' && parsedAmount > maxAllowed) return false;
    return true;
  }, [busy, parsedAmount, maxAllowed]);

  async function onSave() {
    if (!token) return;

    const cleaned = amount.replace(/[^0-9.]/g, '');
    const n = Number(cleaned);

    if (!Number.isFinite(n) || n <= 0) {
      Alert.alert(t('payment.invalidAmount.title'), t('payment.invalidAmount.message'));
      return;
    }

    if (typeof maxAllowed === 'number' && n > maxAllowed) {
      const msg =
        selectedQuick === 'overdue'
          ? t('payment.tooMuch.message.min', { max: maxAllowed })
          : t('payment.tooMuch.message.total', { max: maxAllowed });
      Alert.alert(t('payment.tooMuch.title'), msg);
      return;
    }

    try {
      setBusy(true);
      await api.payments.add(token, { memberId, amount: n });
      onDone?.();
      navigation.goBack();
    } catch (e: any) {
      Alert.alert(t('common.error'), getFriendlyErrorMessage({ error: e, t }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <AppBar title={t('payment.add.title')} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('payment.totalPayable')}</Text>
            <Badge
              label={typeof totalPayableNum === 'number' ? formatMoney(totalPayableNum, { decimals: 2 }) : '—'}
              tone={typeof totalPayableNum === 'number' && totalPayableNum > 0 ? 'warning' : 'muted'}
            />
          </View>

          <View style={{ height: 10 }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('payment.minimumPayable')}</Text>
            <Badge label={formatMoney(minimumPayableNum, { decimals: 2 })} tone={minimumPayableNum > 0 ? 'danger' : 'muted'} />
          </View>

          <Text style={{ color: theme.colors.textMuted, fontWeight: '600', marginTop: 10, lineHeight: 18 }}>{helper}</Text>

          {typeof totalPayableNum === 'number' ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
              <QuickChip
                label={t('payment.quick.minimum')}
                onPress={() => {
                  setSelectedQuick('overdue');
                  setAmount(String(minimumPayableNum));
                }}
              />
              <QuickChip
                label={t('payment.quick.total')}
                onPress={() => {
                  setSelectedQuick('due');
                  setAmount(String(totalPayableNum));
                }}
              />
            </View>
          ) : null}

          <View style={{ height: theme.spacing.lg }} />

          <Label>{t('payment.amountReceived')}</Label>
          <Field
            value={amount}
            onChangeText={(tt) => {
              setSelectedQuick(null);
              setAmount(tt.replace(/[^0-9.]/g, ''));
            }}
            placeholder={
              typeof totalPayableNum === 'number'
                ? t('payment.placeholder.max', { max: totalPayableNum })
                : t('payment.placeholder.enterAmount')
            }
            keyboardType="numeric"
          />

          {Number.isFinite(parsedAmount) && parsedAmount > 0 ? (
            <Text style={{ marginTop: 10, color: theme.colors.textMuted, fontWeight: '700' }}>
              {t('payment.summary.paying')}{' '}
              <Text style={{ color: theme.colors.text, fontWeight: '900' }}>{formatMoney(round2(parsedAmount), { decimals: 2 })}</Text>
              {typeof totalPayableNum === 'number' ? (
                <Text>
                  {'  '}• {t('payment.summary.remainingTotal')}{' '}
                  <Text style={{ color: theme.colors.text, fontWeight: '900' }}>
                    {formatMoney(round2(Math.max(0, totalPayableNum - parsedAmount)), { decimals: 2 })}
                  </Text>
                </Text>
              ) : null}
              {selectedQuick === 'overdue' ? (
                <Text>
                  {'\n'}{t('payment.summary.remainingOverdue')}{' '}
                  <Text style={{ color: theme.colors.text, fontWeight: '900' }}>
                    {formatMoney(round2(Math.max(0, minimumPayableNum - parsedAmount)), { decimals: 2 })}
                  </Text>
                </Text>
              ) : null}
            </Text>
          ) : null}

          <View style={{ marginTop: theme.spacing.md }}>
            <Button title={busy ? t('common.loading') : t('common.save')} disabled={!canSave} onPress={onSave} />
            <Button title={t('common.back')} variant="secondary" disabled={busy} onPress={() => navigation.goBack()} />
          </View>
        </Card>
      </KeyboardAvoidingView>
    </Screen>
  );
}
