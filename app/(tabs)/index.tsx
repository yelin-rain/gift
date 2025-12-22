import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/bg.jpg")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            什么时候下班啊
          </ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">你有什么想法吗？</ThemedText>
          <ThemedText>
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: "cmd + d",
                android: "cmd + m",
                web: "F12",
              })}
            </ThemedText>{" "}
            “你有打火机吗？” “没有。” “那你是怎么点燃我的心的？”
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modal">
            <Link.Trigger>
              <ThemedText type="subtitle">点我跳转-解锁隐藏玩法</ThemedText>
            </Link.Trigger>
            <Link.Preview />
            <Link.Menu>
              <Link.MenuAction
                title="Action"
                icon="cube"
                onPress={() => alert("Action pressed")}
              />
              <Link.MenuAction
                title="Share"
                icon="square.and.arrow.up"
                onPress={() => alert("Share pressed")}
              />
              <Link.Menu title="More" icon="ellipsis">
                <Link.MenuAction
                  title="Delete"
                  icon="trash"
                  destructive
                  onPress={() => alert("Delete pressed")}
                />
              </Link.Menu>
            </Link.Menu>
          </Link>

          <ThemedText>
            {`故事的小黄花 从出生那年就飘着 童年的荡秋千 随记忆一直晃到现在 Re Do Si La So La Si Si Si Si La Si La So 吹着前奏望着天空 我想起花瓣试着掉落`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">没啥了</ThemedText>
          <ThemedText>真没啥了吗？你这都不探索探索啊？</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "pink",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: width,
    height: height * 0.3,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
