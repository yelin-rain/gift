import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView, WebViewNavigation } from "react-native-webview";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";

// 默认 URL，你可以修改为任何网站
const DEFAULT_URL = "https://music.163.com/";

export default function ModalScreen() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setUrl(navState.url);
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn("WebView 加载错误:", nativeEvent);
    Alert.alert("加载失败", "网页加载出错，请检查网络连接或稍后重试。");
    setLoading(false);
  };

  const goBack = () => {
    webViewRef.current?.goBack();
  };

  const goForward = () => {
    webViewRef.current?.goForward();
  };

  const reload = () => {
    webViewRef.current?.reload();
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 顶部导航栏 */}
      <ThemedView style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={goBack}
            disabled={!canGoBack}
            style={[
              styles.headerButton,
              !canGoBack && styles.headerButtonDisabled,
            ]}
          >
            <IconSymbol
              size={22}
              name="chevron.left"
              color={canGoBack ? "#333" : "#ccc"}
            />
          </Pressable>
          <Pressable
            onPress={goForward}
            disabled={!canGoForward}
            style={[
              styles.headerButton,
              !canGoForward && styles.headerButtonDisabled,
            ]}
          >
            <IconSymbol
              size={22}
              name="chevron.right"
              color={canGoForward ? "#333" : "#ccc"}
            />
          </Pressable>
          <Pressable onPress={reload} style={styles.headerButton}>
            <IconSymbol size={22} name="arrow.clockwise" color="#333" />
          </Pressable>
        </View>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <IconSymbol size={22} name="xmark" color="#333" />
        </Pressable>
      </ThemedView>

      {/* URL 显示栏 */}
      <ThemedView style={styles.urlBar}>
        <ThemedText style={styles.urlText} numberOfLines={1}>
          {url}
        </ThemedText>
      </ThemedView>

      {/* WebView */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          thirdPartyCookiesEnabled={true}
          mixedContentMode="always"
          userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
        />

        {/* 加载指示器 */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6FA8" />
            <ThemedText style={styles.loadingText}>加载中...</ThemedText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerButtonDisabled: {
    opacity: 0.3,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
  },
  urlBar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
  },
  urlText: {
    fontSize: 12,
    color: "#666",
  },
  webviewContainer: {
    flex: 1,
    position: "relative",
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
});
