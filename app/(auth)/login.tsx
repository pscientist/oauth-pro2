import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onGoogleSignInPress = async () => {
    console.log("onGoogleSignInPress");
    try {
      setLoading(true);

      // Creates a deep link by prefixing the path with the app scheme/host.
      // Example: myapp://oauth-native-callback (must match Clerk redirect config in Step 2).
      const redirectUrl = Linking.createURL("/oauth-native-callback");

      // Starts the OAuth browser flow and returns the created session (if any)
      // plus a helper to activate it in the Clerk client.
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl,
      });

      console.log("createdSessionId", createdSessionId);
      console.log("redirectUrl", redirectUrl);
      console.log("setActive", setActive);

      if (createdSessionId) {
        // call the setActive helper with the createdSessionId to tell Clerk 
        //   which session should be active on the device
        await setActive!({ session: createdSessionId });
        router.replace("/protected");
      }
    } catch (err) {
      console.error("OAuth error:", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={onGoogleSignInPress}
          disabled={loading}
          style={[styles.link, loading && styles.linkDisabled]}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.linkText}>Sign in with Google</Text>
          )}
        </TouchableOpacity>
      </View>

      <Link href="/">Back Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  linksContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 16,
  },
  link: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  linkDisabled: {
    opacity: 0.6,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});



