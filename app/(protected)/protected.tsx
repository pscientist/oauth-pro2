import { useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProtectedPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected</Text>
      <Text>If you can see this, guard passed.</Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.link}
          activeOpacity={0.7}
        >
          <Text style={styles.linkText}>Logout</Text>
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
  linkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});





