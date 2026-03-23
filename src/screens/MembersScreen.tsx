import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../auth/authStore';
import { AppBar, Badge, Card, IconButton, ListItem, Screen, SearchField, SectionTitle } from '../components/ui';
import { useI18n } from '../i18n/i18n';
import { theme } from '../theme/theme';
import type { Member } from '../types/api';

export function MembersScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { token } = useAuth();
  const groupId = route.params.groupId as string;

  const [members, setMembers] = useState<Member[]>([]);
  const [canAddMember, setCanAddMember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');

  async function load() {
    if (!token) return;
    setBusy(true);
    try {
      const [membersData, group] = await Promise.all([
        api.groups.members.list(token, groupId),
        api.groups.get(token, groupId),
      ]);
      setMembers(membersData);
      setCanAddMember((group as any).currentMonth === 0);
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.message ?? t('common.error'));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, [token, groupId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => String(m.name ?? '').toLowerCase().includes(q));
  }, [members, query]);

  const right = (
    <>
      {canAddMember ? (
        <IconButton
          label="+"
          onPress={() => navigation.navigate('AddMember', { groupId, onDone: load })}
        />
      ) : null}
    </>
  );

  const countLabel = members.length === 1 ? t('members.count.single') : t('members.count.multi', { count: members.length });

  return (
    <Screen>
      <AppBar title={t('members.title')} right={right} />

      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.textMuted, fontWeight: '800' }}>{t('members.title')}</Text>
          <Badge label={`${members.length}`} tone="muted" />
        </View>
        <Text style={{ color: theme.colors.text, fontWeight: '900', marginTop: 6, fontSize: 18 }}>{countLabel}</Text>

        <View style={{ height: 12 }} />

        {canAddMember ? (
          <Text style={{ color: theme.colors.textMuted, fontWeight: '600' }}>{t('members.canAdd')}</Text>
        ) : (
          <Text style={{ color: theme.colors.textMuted, fontWeight: '600' }}>{t('members.cannotAdd')}</Text>
        )}

        <View style={{ height: 12 }} />
        <SearchField value={query} onChangeText={setQuery} placeholder={t('common.search')} />
      </Card>

      <SectionTitle>{t('members.section.all')}</SectionTitle>
      <FlatList
        refreshing={busy}
        onRefresh={load}
        data={filtered}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            right={<Text style={{ color: theme.colors.textMuted, fontWeight: '900' }}>›</Text>}
            onPress={() => navigation.navigate('MemberDetail', { memberId: item.id, groupId })}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            {members.length === 0 ? t('members.empty.none') : t('members.empty.noResults')}
          </Text>
        }
      />
    </Screen>
  );
}
