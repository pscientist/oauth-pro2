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
      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={handleLoginPress}
          style={styles.link}
          activeOpacity={0.7}
        >
          <Text style={styles.linkText}>Go to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleProtectedPress}
          style={styles.link}
          activeOpacity={0.7}
        >
          <Text style={styles.linkText}>Go to Protected</Text>
        </TouchableOpacity>
      </View>
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
  linkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
