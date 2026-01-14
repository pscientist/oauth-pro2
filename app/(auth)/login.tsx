import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onGoogleSignInPress = async () => {
    console.log("onGoogleSignInPress");
    try {
      setLoading(true);

      const redirectUrl = Linking.createURL("/oauth-native-callback");
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl,
      });

      console.log("createdSessionId", createdSessionId);
      console.log("redirectUrl", redirectUrl);
      console.log("setActive", setActive);

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("OAuth error:", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 24,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Login</Text>
      <Text>No sign-up yet.</Text>

      <TouchableOpacity
        onPress={onGoogleSignInPress}
        disabled={loading}
        style={{
          minHeight: 48,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 10,
          backgroundColor: "#D8A05E",
          opacity: loading ? 0.6 : 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#3A2F2F" />
        ) : (
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#3A2F2F" }}>
            Sign in with Google
          </Text>
        )}
      </TouchableOpacity>

      {/* This link will redirect away until isLoggedIn becomes true. */}
      <Link href="/">Back Home</Link>
    </View>
  );
}



