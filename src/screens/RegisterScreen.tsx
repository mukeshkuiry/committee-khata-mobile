import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { Button, Card, Field, Label, Screen, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import { getFriendlyErrorMessage } from '../utils/errors';

export function RegisterScreen({ navigation }: any) {
  const { t } = useI18n();
  const { setToken } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', paddingBottom: theme.spacing.xl }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 84, height: 84, marginBottom: theme.spacing.md }}
            resizeMode="contain"
          />
          <Text style={{ color: theme.colors.text, fontSize: 34, fontWeight: '900' }}>{t('app.name')}</Text>
          <Text style={{ color: theme.colors.textMuted, marginTop: 6 }}>{t('auth.register.subtitle')}</Text>
        </View>

        <View style={{ width: '100%' }}>
          <Card>
            <SectionTitle>{t('auth.register.detailsTitle')}</SectionTitle>

            <Label>{t('auth.register.name')}</Label>
            <Field value={name} onChangeText={setName} placeholder={t('auth.register.name')} />

            <Label>{t('auth.register.phoneOptional')}</Label>
            <Field value={phone} onChangeText={setPhone} placeholder={t('auth.register.phoneOptional')} keyboardType="phone-pad" />

            <Label>{t('auth.register.emailOptional')}</Label>
            <Field value={email} onChangeText={setEmail} placeholder={t('auth.register.emailOptional')} keyboardType="email-address" />

            <SectionTitle>{t('auth.register.passwordTitle')}</SectionTitle>
            <Label>{t('auth.register.passwordCreate')}</Label>
            <Field value={password} onChangeText={setPassword} placeholder={t('auth.signIn.password')} secureTextEntry />

            <Button
              title={busy ? t('auth.register.creating') : t('auth.register.title')}
              disabled={busy}
              onPress={async () => {
                try {
                  setBusy(true);
                  const res = await api.auth.register({
                    name,
                    password,
                    ...(phone ? { phone } : {}),
                    ...(email ? { email } : {}),
                  });
                  setToken(res.token);
                } catch (e: any) {
                  Alert.alert(t('auth.register.cannotCreateTitle'), getFriendlyErrorMessage({ error: e, t }));
                } finally {
                  setBusy(false);
                }
              }}
            />

            <Button title={t('common.back')} variant="secondary" onPress={() => navigation.goBack()} />
          </Card>
        </View>
      </View>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: theme.spacing.md, alignItems: 'center' }}>
        <Text style={{ color: theme.colors.textMuted, fontWeight: '700', fontSize: 12, textAlign: 'center' }}>Created with ❤️ by Mukesh</Text>
      </View>
    </Screen>
  );
}
