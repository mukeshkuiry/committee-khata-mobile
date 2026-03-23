import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Badge, Button, IconButton, LanguageSwitcherModal, ListItem, Screen, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import type { GroupListItem } from '../types/api';
import { getFriendlyErrorMessage } from '../utils/errors';
import { formatDate, formatMoney } from '../utils/format';

export function GroupsScreen({ navigation }: any) {
  const { t, lang, setLang } = useI18n();
  const { token, setToken } = useAuth();
  const [groups, setGroups] = useState<GroupListItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  async function load() {
    if (!token) return;
    setBusy(true);
    try {
      const data = await api.groups.list(token);
      setGroups(data);
    } catch (e: any) {
      Alert.alert(t('common.error'), getFriendlyErrorMessage({ error: e, t }));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, [token]);

  function confirmLogout() {
    setMenuOpen(false);
    Alert.alert(t('groups.signOut.title'), t('groups.signOut.message'), [
      { text: t('common.back'), style: 'cancel' },
      { text: t('groups.signOut.confirm'), style: 'destructive', onPress: () => setToken(null) },
    ]);
  }

  function openLanguage() {
    setMenuOpen(false);
    setLangOpen(true);
  }

  return (
    <Screen>
      <View style={{ zIndex: 10 }}>
        <AppBar
          title={t('groups.title')}
          right={
            <>
              <IconButton label="⋯" onPress={() => setMenuOpen((v) => !v)} />
            </>
          }
        />

        <LanguageSwitcherModal
          open={langOpen}
          current={lang}
          labels={{
            title: t('menu.language'),
            english: t('language.english'),
            hindi: t('language.hindi'),
            bengali: t('language.bengali'),
            close: t('common.back'),
          }}
          onClose={() => setLangOpen(false)}
          onSelect={(l) => {
            setLang(l);
            setLangOpen(false);
          }}
        />

        {menuOpen ? (
          <>
            {/* Backdrop to close */}
            <Pressable
              onPress={() => setMenuOpen(false)}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: -1000 }}
            />

            {/* Dropdown menu */}
            <View
              style={{
                position: 'absolute',
                top: 48,
                right: 0,
                backgroundColor: theme.colors.surface,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.md,
                padding: 8,
                minWidth: 200,
              }}
            >
              <Pressable
                onPress={openLanguage}
                style={({ pressed }) => [
                  {
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: theme.radii.sm,
                  },
                  pressed && { opacity: 0.75 },
                ]}
              >
                <Text style={{ color: theme.colors.text, fontWeight: '900' }}>{t('menu.language')}</Text>
              </Pressable>

              <View style={{ height: 6 }} />

              <Pressable
                onPress={confirmLogout}
                style={({ pressed }) => [
                  {
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: theme.radii.sm,
                  },
                  pressed && { opacity: 0.75 },
                ]}
              >
                <Text style={{ color: theme.colors.danger, fontWeight: '900' }}>{t('menu.signOut')}</Text>
              </Pressable>
            </View>
          </>
        ) : null}
      </View>

      {/* Primary action */}
      <View style={{ marginBottom: theme.spacing.md }}>
        <Button title={t('groups.create')} onPress={() => navigation.navigate('CreateGroup', { onDone: load })} />
      </View>

      <SectionTitle>{t('groups.section')}</SectionTitle>
      <FlatList
        refreshing={busy}
        onRefresh={load}
        data={groups}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => {
          const currentMonth = item.currentMonth ?? 0;
          const totalMonths = item.totalMonths ?? undefined;
          const monthLabel = totalMonths
            ? t('groups.monthLabel', { current: currentMonth, total: totalMonths })
            : t('groups.monthLabel', { current: currentMonth, total: '—' });

          const totalDue = item.totalDue ?? 0;
          const hasDue = totalDue > 0;
          const isCompleted = !!totalMonths && currentMonth === totalMonths && totalDue === 0;

          const createdLabel = item.createdAt ? formatDate(item.createdAt) : '';
          const nextLabel = item.nextContributionDate ? formatDate(item.nextContributionDate) : '';

          const subtitleLines = [isCompleted ? t('groups.completed') : monthLabel];
          if (createdLabel) subtitleLines.push(t('groups.createdOn', { date: createdLabel }));
          if (nextLabel) subtitleLines.push(t('groups.nextContributionOn', { date: nextLabel }));

          const subtitle = subtitleLines.join('\n');

          const dueTone = hasDue ? 'warning' : 'muted';

          return (
            <ListItem
              title={item.name}
              subtitle={subtitle}
              right={
                isCompleted ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Badge label={t('groups.completedBadge')} tone={'success' as any} />
                    <Text style={{ color: theme.colors.textMuted, fontWeight: '900' }}>›</Text>
                  </View>
                ) : (
                  <View style={{ alignItems: 'flex-end', gap: 8 }}>
                    <Text style={{ color: theme.colors.text, fontWeight: '900' }}>{formatMoney(item.availableGroupBalance)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      {typeof item.totalDue === 'number' ? <Badge label={`${t('groups.pending')} ${formatMoney(totalDue)}`} tone={dueTone as any} /> : null}
                      <Text style={{ color: theme.colors.textMuted, fontWeight: '900' }}>›</Text>
                    </View>
                  </View>
                )
              }
              onPress={() => navigation.navigate('GroupDetail', { groupId: item.id, name: item.name })}
            />
          );
        }}
        ListEmptyComponent={
          <View style={{ marginTop: theme.spacing.lg }}>
            <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('groups.empty.title')}</Text>
            <Text style={{ color: theme.colors.textMuted, marginTop: 6 }}>{t('groups.empty.subtitle')}</Text>
          </View>
        }
      />
    </Screen>
  );
}
