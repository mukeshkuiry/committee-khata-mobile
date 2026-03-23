import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import { api } from './src/api/client';
import { AuthProvider, useAuth } from './src/auth/authStore';
import { Card, Screen, SectionTitle } from './src/components/ui';
import { I18nProvider, useI18n } from './src/i18n/i18n';
import { AddMemberScreen } from './src/screens/AddMemberScreen';
import { AddPaymentScreen } from './src/screens/AddPaymentScreen';
import { CreateGroupScreen } from './src/screens/CreateGroupScreen';
import { CreateMonthScreen } from './src/screens/CreateMonthScreen';
import { GroupDetailScreen } from './src/screens/GroupDetailScreen';
import { GroupsScreen } from './src/screens/GroupsScreen';
import { GroupSummaryScreen } from './src/screens/GroupSummaryScreen';
import { IssueLoanScreen } from './src/screens/IssueLoanScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { MemberDetailScreen } from './src/screens/MemberDetailScreen';
import { MembersScreen } from './src/screens/MembersScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';

enableScreens(true);

const Stack = createNativeStackNavigator();

function FullScreenLoader({ title }: { title: string }) {
  return (
    <Screen>
      <Card>
        <SectionTitle>{title}</SectionTitle>
      </Card>
    </Screen>
  );
}

function AuthedApp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Groups" component={GroupsScreen} options={{ title: 'Groups' }} />
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen} options={{ title: 'Create Group' }} />
      <Stack.Screen name="GroupDetail" component={GroupDetailScreen} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="GroupSummary" component={GroupSummaryScreen} options={{ title: 'Summary' }} />
      <Stack.Screen name="Members" component={MembersScreen} options={{ title: 'Members' }} />
      <Stack.Screen name="AddMember" component={AddMemberScreen} options={{ title: 'Add Member' }} />
      <Stack.Screen name="MemberDetail" component={MemberDetailScreen} options={{ title: 'Member' }} />
      <Stack.Screen name="AddPayment" component={AddPaymentScreen} options={{ title: 'Add Payment' }} />
      <Stack.Screen name="IssueLoan" component={IssueLoanScreen} options={{ title: 'Issue Loan' }} />
      <Stack.Screen name="CreateMonth" component={CreateMonthScreen} options={{ title: 'Create Month' }} />
    </Stack.Navigator>
  );
}

function UnauthedApp() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function Root() {
  const { token, setToken, restoring } = useAuth();
  const { t, restoring: i18nRestoring } = useI18n();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (!token) return;
      setChecking(true);
      try {
        await api.auth.me(token);
      } catch {
        // Ensure token is cleared everywhere
        if (!cancelled) setToken(null);
      } finally {
        if (!cancelled) setChecking(false);
      }
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [token, setToken]);

  if (i18nRestoring || restoring) {
    return <FullScreenLoader title={t('common.loading')} />;
  }

  if (token && checking) {
    return <FullScreenLoader title={t('common.loading')} />;
  }

  return token ? <AuthedApp /> : <UnauthedApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
          <StatusBar style="light" />
        </SafeAreaProvider>
      </I18nProvider>
    </AuthProvider>
  );
}
