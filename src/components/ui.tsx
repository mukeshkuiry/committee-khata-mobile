import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Lang } from '../i18n/translations';
import { theme } from '../theme/theme';

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.screen}>{children}</View>
    </SafeAreaView>
  );
}

export function AppBar({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>{title}</Text>
      <View style={styles.appBarRight}>{right}</View>
    </View>
  );
}

export function IconButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, style, pressed && { opacity: 0.75 }]}
      hitSlop={10}
    >
      <Text style={styles.iconButtonText}>{label}</Text>
    </Pressable>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function StatPill({ value }: { value: string }) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statPillText}>{value}</Text>
    </View>
  );
}

export function Badge({
  label,
  tone = 'muted',
}: {
  label: string;
  tone?: 'muted' | 'warning' | 'danger' | 'success';
}) {
  const toneStyle =
    tone === 'danger'
      ? { backgroundColor: theme.colors.dangerBg, borderColor: 'rgba(239, 68, 68, 0.35)', color: theme.colors.danger }
      : tone === 'warning'
        ? { backgroundColor: theme.colors.warningBg, borderColor: 'rgba(245, 158, 11, 0.35)', color: theme.colors.warning }
        : tone === 'success'
          ? { backgroundColor: theme.colors.successBg, borderColor: 'rgba(34, 197, 94, 0.35)', color: theme.colors.success }
          : { backgroundColor: theme.colors.mutedBg, borderColor: theme.colors.border2, color: theme.colors.textSoft };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        backgroundColor: toneStyle.backgroundColor,
        borderColor: toneStyle.borderColor,
      }}
    >
      <Text style={{ color: toneStyle.color, fontWeight: '900', fontSize: 12 }}>{label}</Text>
    </View>
  );
}

export function Button({
  title,
  onPress,
  disabled,
  variant = 'primary',
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        (pressed || disabled) && styles.buttonPressed,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export function Field({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textMuted}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      autoCapitalize="none"
    />
  );
}

export function SearchField({
  value,
  onChangeText,
  placeholder = 'Search…',
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={styles.searchWrap}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.searchInput, value ? { paddingRight: 44 } : null]}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value ? (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={10}
          style={({ pressed }) => [styles.searchClear, pressed && { opacity: 0.75 }]}
        >
          <Text style={{ color: theme.colors.textMuted, fontWeight: '900', fontSize: 18 }}>×</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function ListItem({
  title,
  subtitle,
  right,
  onPress,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}) {
  const content = (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.listItemTitle}>{title}</Text>
        {subtitle ? <Text style={styles.listItemSubtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.listItemRight}>{right}</View> : null}
    </View>
  );

  if (!onPress) return <View style={{ marginBottom: theme.spacing.sm }}>{content}</View>;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.78 : 1 }, { marginBottom: theme.spacing.sm }]}>
      <View style={styles.card}>{content}</View>
    </Pressable>
  );
}

export function Row({ left, right }: { left: string; right: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLeft}>{left}</Text>
      <Text style={styles.rowRight}>{right}</Text>
    </View>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  tone = 'warning',
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: 'warning' | 'danger' | 'muted' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.dialogBackdrop} onPress={onCancel} />
      <View style={styles.dialogWrap}>
        <View style={styles.dialogCard}>
          <Text style={styles.dialogTitle}>{title}</Text>
          {message ? <Text style={styles.dialogMessage}>{message}</Text> : null}

          <View style={styles.dialogActions}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [styles.dialogBtn, styles.dialogBtnSecondary, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.dialogBtnTextSecondary}>{cancelText}</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.dialogBtn,
                tone === 'danger' ? styles.dialogBtnDanger : tone === 'success' ? styles.dialogBtnSuccess : styles.dialogBtnPrimary,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.dialogBtnTextPrimary}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function LanguageSwitcherModal({
  open,
  current,
  labels,
  onSelect,
  onClose,
}: {
  open: boolean;
  current: Lang;
  labels: { title: string; english: string; hindi: string; bengali: string; close: string };
  onSelect: (lang: Lang) => void;
  onClose: () => void;
}) {
  function Option({ lang, label }: { lang: Lang; label: string }) {
    const active = current === lang;
    return (
      <Pressable
        onPress={() => onSelect(lang)}
        style={({ pressed }) => [
          {
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: theme.radii.md,
            borderWidth: 1,
            borderColor: active ? theme.colors.border : theme.colors.border2,
            backgroundColor: active ? theme.colors.surface : theme.colors.surface2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={{ color: active ? theme.colors.text : theme.colors.textMuted, fontWeight: '900' }}>{label}</Text>
        {active ? <Text style={{ color: theme.colors.success, fontWeight: '900' }}>✓</Text> : null}
      </Pressable>
    );
  }

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.dialogBackdrop} onPress={onClose} />
      <View style={styles.dialogWrap}>
        <View style={styles.dialogCard}>
          <Text style={styles.dialogTitle}>{labels.title}</Text>
          <View style={{ height: 12 }} />
          <View style={{ gap: 10 }}>
            <Option lang="en" label={labels.english} />
            <Option lang="hi" label={labels.hindi} />
            <Option lang="bn" label={labels.bengali} />
          </View>
          <View style={{ height: 14 }} />
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.dialogBtn, styles.dialogBtnSecondary, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.dialogBtnTextSecondary}>{labels.close}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.bg },
  screen: { flex: 1, padding: theme.spacing.lg, backgroundColor: theme.colors.bg },

  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  appBarTitle: { color: theme.colors.text, ...theme.text.title },
  appBarRight: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },

  title: { color: theme.colors.text, ...theme.text.title, marginBottom: theme.spacing.md },
  sectionTitle: { color: theme.colors.textSoft, ...theme.text.body, marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },

  label: { color: theme.colors.textSoft, marginTop: theme.spacing.md, marginBottom: theme.spacing.xs, fontWeight: '700' },

  input: {
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    color: theme.colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radii.sm,
  },

  searchWrap: { position: 'relative' },
  searchInput: {
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    color: theme.colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
  },
  searchClear: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
  },

  button: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.surface2,
    borderColor: theme.colors.border2,
  },
  buttonPressed: { opacity: 0.82 },
  buttonText: { color: theme.colors.text, fontWeight: '800' },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: theme.radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.border2,
  },
  iconButtonText: { color: theme.colors.text, fontWeight: '900' },

  statPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.border2,
  },
  statPillText: { color: theme.colors.text, fontWeight: '900', fontSize: 16 },

  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    padding: 12,
  },

  listItem: { flexDirection: 'row', alignItems: 'center' },
  listItemTitle: { color: theme.colors.text, fontWeight: '800', fontSize: 16 },
  listItemSubtitle: { color: theme.colors.textMuted, marginTop: 4, fontWeight: '600' },
  listItemRight: { marginLeft: theme.spacing.sm },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  rowLeft: { color: theme.colors.textSoft, fontWeight: '700' },
  rowRight: { color: theme.colors.text, fontWeight: '800' },

  dialogBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  dialogWrap: { flex: 1, justifyContent: 'center', padding: theme.spacing.lg },
  dialogCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
  },
  dialogTitle: { color: theme.colors.text, fontWeight: '900', fontSize: 18 },
  dialogMessage: { color: theme.colors.textMuted, marginTop: 10, fontWeight: '600', lineHeight: 20 },
  dialogActions: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.lg },
  dialogBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  dialogBtnSecondary: { backgroundColor: theme.colors.surface2, borderColor: theme.colors.border2 },
  dialogBtnPrimary: { backgroundColor: theme.colors.primary, borderColor: 'rgba(255,255,255,0.08)' },
  dialogBtnWarning: { backgroundColor: theme.colors.warningBg, borderColor: 'rgba(245, 158, 11, 0.35)' },
  dialogBtnDanger: { backgroundColor: theme.colors.dangerBg, borderColor: 'rgba(239, 68, 68, 0.35)' },
  dialogBtnSuccess: { backgroundColor: theme.colors.successBg, borderColor: 'rgba(34, 197, 94, 0.35)' },
  dialogBtnMuted: { backgroundColor: theme.colors.mutedBg, borderColor: theme.colors.border2 },
  dialogBtnTextPrimary: { color: theme.colors.text, fontWeight: '900' },
  dialogBtnTextSecondary: { color: theme.colors.text, fontWeight: '900' },
});
