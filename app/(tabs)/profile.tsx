import { Image } from "expo-image";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";

const accent = "#FF6FA8";
const borderColor = "#F0F0F0";

export default function ProfileScreen() {
  const onEditProfile = () => {
    Alert.alert("编辑资料", "这里可以对接编辑个人信息的表单页面。");
  };

  const onEditSignature = () => {
    Alert.alert("个性签名", "这里可以弹出输入框修改你的个性签名。");
  };

  const onAbout = () => {
    Alert.alert("关于我们", "展示应用版本号、团队信息、隐私政策等内容。");
  };

  const onLogout = () => {
    Alert.alert("退出登录", "这里可以对接实际的退出登录逻辑。");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* 顶部个人信息 */}
        <ThemedView style={styles.profileCard}>
          <View style={styles.heroRow}>
            <Image
              source={{
                uri: "@/assets/images/avatar.png",
              }}
              style={styles.avatar}
            />
            <View style={styles.heroInfo}>
              <ThemedText type="title" style={styles.name}>
                yalier
              </ThemedText>
              <ThemedText type="default">ID：1008611</ThemedText>
              <ThemedText type="default" style={styles.signature}>
                个性签名：慢慢理解世界，慢慢更新自己。
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* 设置项列表 */}
        <ThemedView style={styles.card}>
          <SectionHeader title="账号信息" />
          <SettingItem
            icon="person.crop.circle"
            label="修改个人信息"
            description="昵称、头像、性别等"
            onPress={onEditProfile}
          />
          <SettingItem
            icon="text.bubble.fill"
            label="个性签名"
            description="编辑展示给他人的一句话"
            onPress={onEditSignature}
          />
        </ThemedView>

        <ThemedView style={styles.card}>
          <SectionHeader title="其他" />
          <SettingItem
            icon="info.circle.fill"
            label="关于我们"
            description="版本信息、团队介绍"
            onPress={onAbout}
          />
          <SettingItem
            icon="rectangle.portrait.and.arrow.right"
            label="退出登录"
            type="danger"
            onPress={onLogout}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <View style={styles.sectionAccent} />
    </View>
  );
}

type SettingItemProps = {
  icon: string;
  label: string;
  description?: string;
  type?: "default" | "danger";
  onPress?: () => void;
};

function SettingItem({
  icon,
  label,
  description,
  type = "default",
  onPress,
}: SettingItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        pressed && styles.settingRowPressed,
      ]}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIconWrapper}>
          <IconSymbol size={18} name={icon as any} color={accent} />
        </View>
        <View style={styles.settingTextWrapper}>
          <ThemedText
            type="defaultSemiBold"
            style={type === "danger" ? styles.dangerText : undefined}
          >
            {label}
          </ThemedText>
          {description ? (
            <ThemedText type="default" style={styles.settingDescription}>
              {description}
            </ThemedText>
          ) : null}
        </View>
      </View>
      <IconSymbol size={16} name="chevron.right" color="#C0C0C0" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  profileCard: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 20,
    backgroundColor: "#f8d9e6",
  },
  heroInfo: {
    flex: 1,
    gap: 6,
  },
  name: {
    color: "#222",
  },
  signature: {
    marginTop: 4,
    color: "#666",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#333",
  },
  sectionAccent: {
    height: 3,
    width: 44,
    backgroundColor: accent,
    borderRadius: 99,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
  },
  settingRowPressed: {
    backgroundColor: "#F7F7F7",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  settingIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  settingTextWrapper: {
    flex: 1,
  },
  settingDescription: {
    marginTop: 2,
    color: "#888",
    fontSize: 12,
  },
  dangerText: {
    color: "#D64545",
  },
});
