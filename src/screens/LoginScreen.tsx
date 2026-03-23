import { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { Button, Card, Field, Label, Screen, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import { getFriendlyErrorMessage } from '../utils/errors';

export function LoginScreen({ navigation }: any) {
  const { t } = useI18n();
  const { setToken } = useAuth();
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
          <Text style={{ color: theme.colors.textMuted, marginTop: 6 }}>{t('auth.signIn.subtitle')}</Text>
        </View>

        <View style={{ width: '100%' }}>
          <Card>
            <SectionTitle>{t('auth.signIn.title')}</SectionTitle>

            <Label>{t('auth.signIn.email')}</Label>
            <Field value={email} onChangeText={setEmail} placeholder={t('auth.signIn.email')} keyboardType="email-address" />

            <Label>{t('auth.signIn.password')}</Label>
            <Field value={password} onChangeText={setPassword} placeholder={t('auth.signIn.password')} secureTextEntry />

            <Button
              title={busy ? `${t('common.loading')}` : t('auth.signIn.button')}
              disabled={busy}
              onPress={async () => {
                try {
                  setBusy(true);
                  const res = await api.auth.login({ email, password });
                  setToken(res.token);
                } catch (e: any) {
                  Alert.alert(t('common.error'), getFriendlyErrorMessage({ error: e, t }));
                } finally {
                  setBusy(false);
                }
              }}
            />

            <Button title={t('auth.createAccount.title')} variant="secondary" onPress={() => navigation.navigate('Register')} />
          </Card>
        </View>
      </View>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: theme.spacing.md, alignItems: 'center' }}>
        <Text style={{ color: theme.colors.textMuted, fontWeight: '700', fontSize: 12, textAlign: 'center' }}>Created with ❤️ by Mukesh</Text>
      </View>
    </Screen>
  );
}
