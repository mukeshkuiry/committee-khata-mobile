import React, { useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { Button, Field, Label, Screen, Title } from '../components/ui';
import { useI18n } from '../i18n/i18n';

export function CreateGroupScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const onDone = route?.params?.onDone as undefined | (() => void);

  const [name, setName] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [totalMonths, setTotalMonths] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <Screen>
      <Title>{t('group.create.title')}</Title>

      <Label>{t('group.create.groupName')}</Label>
      <Field value={name} onChangeText={setName} placeholder={t('group.create.groupName')} />

      <Label>{t('group.create.monthlyAmount')}</Label>
      <Field
        value={monthlyContribution}
        onChangeText={setMonthlyContribution}
        placeholder={t('group.create.monthlyAmount')}
        keyboardType="numeric"
      />

      <Label>{t('group.create.interest')}</Label>
      <Field value={interestRate} onChangeText={setInterestRate} placeholder={t('group.create.interest')} keyboardType="numeric" />

      <Label>{t('group.create.lateFee')}</Label>
      <Field value={fineAmount} onChangeText={setFineAmount} placeholder={t('group.create.lateFee')} keyboardType="numeric" />

      <Label>{t('group.create.totalMonths')}</Label>
      <Field value={totalMonths} onChangeText={setTotalMonths} placeholder={t('group.create.totalMonths')} keyboardType="numeric" />

      <Button
        title={busy ? t('group.create.creating') : t('group.create.button')}
        disabled={busy}
        onPress={async () => {
          if (!token) return;
          try {
            setBusy(true);
            await api.groups.create(token, {
              name,
              monthlyContribution: Number(monthlyContribution),
              interestRate: Number(interestRate),
              fineAmount: Number(fineAmount),
              totalMonths: Number(totalMonths),
            });
            onDone?.();
            navigation.goBack();
          } catch (e: any) {
            Alert.alert(t('group.create.cannotTitle'), e?.message ?? t('group.create.cannotMessage'));
          } finally {
            setBusy(false);
          }
        }}
      />

      <Button title={t('common.back')} variant="secondary" onPress={() => navigation.goBack()} />
    </Screen>
  );
}
