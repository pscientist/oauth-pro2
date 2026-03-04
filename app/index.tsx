import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const handleLoginPress = () => {
    console.log("Login button pressed");
    try {
      router.push("/(auth)/login");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleProtectedPress = () => {
    console.log("Protected button pressed");
    try {
      router.push("/(protected)/protected");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OAuth Prototype</Text>
      <Text> This is a prototype for the OAuth implementation. This is a work in progress.</Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={handleLoginPress}
          style={styles.googleButton}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons
            name="google"
            size={20}
            color="#3c4043"
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleProtectedPress}
          style={styles.link}
          activeOpacity={0.7}
        >
          <Text style={styles.linkText}>Members Only</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.version}>
        Version {Constants.expoConfig?.version ?? "1.0.0"}
      </Text>
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
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#dadce0",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
    gap: 12,
  },
  googleButtonText: {
    color: "#3c4043",
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    // backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  linkText: {
    // color: "#FFFFFF",
    fontSize: 16,
    // fontWeight: "600",
  },
  version: {
    fontSize: 22,
    color: "#666",
    marginTop: 24,
  },
});
