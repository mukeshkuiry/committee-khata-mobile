import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { Button, Screen, Title } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';

export function CreateMonthScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const groupId = route.params.groupId as string;
  const onDone = route?.params?.onDone as undefined | (() => void);

  const [busy, setBusy] = useState(false);

  async function create() {
    if (!token) return;
    try {
      setBusy(true);
      await api.groups.members.createMonth(token, groupId);
      onDone?.();
      navigation.goBack();
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.message ?? t('common.error'));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    create();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <Title>{t('month.start.title')}</Title>
      <View style={{ marginTop: theme.spacing.md }}>
        <Text style={{ color: theme.colors.textMuted }}>{t('month.start.starting')}</Text>
      </View>
      <Button title={busy ? t('month.start.button.starting') : t('month.start.button.tryAgain')} onPress={create} disabled={busy} />
      <Button title={t('common.back')} variant="secondary" onPress={() => navigation.goBack()} disabled={busy} />
    </Screen>
  );
}
