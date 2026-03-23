import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Button, Card, Field, Label, Screen } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';

export function AddMemberScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const groupId = route.params.groupId as string;
  const onDone = route?.params?.onDone as undefined | (() => void);

  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  async function onAdd() {
    if (!token) return;

    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert(t('member.add.invalidName.title'), t('member.add.invalidName.message'));
      return;
    }

    try {
      setBusy(true);
      await api.groups.members.add(token, groupId, { name: trimmed });
      onDone?.();
      navigation.goBack();
    } catch (e: any) {
      const msg = String(e?.message ?? 'Error');
      if (msg.includes('DUPLICATE_MEMBER_NAME')) {
        Alert.alert(t('member.add.duplicate.title'), t('member.add.duplicate.message'));
        return;
      }
      if (msg.includes('MEMBER_ADD_LOCKED')) {
        Alert.alert(t('member.add.locked.title'), t('member.add.locked.message'));
        return;
      }
      Alert.alert(t('common.error'), msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <AppBar title={t('member.add.title')} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Card>
          <Label>{t('member.add.memberName')}</Label>
          <Field value={name} onChangeText={setName} placeholder={t('member.add.placeholder')} />

          <View style={{ marginTop: theme.spacing.md }}>
            <Button title={busy ? t('member.add.adding') : t('member.add.button')} disabled={busy} onPress={onAdd} />
            <Button title={t('common.back')} variant="secondary" disabled={busy} onPress={() => navigation.goBack()} />
          </View>
        </Card>
      </KeyboardAvoidingView>
    </Screen>
  );
}
