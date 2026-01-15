import { useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Protected</Text>
      <Text>If you can see this, guard passed.</Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          minHeight: 48,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 10,
          backgroundColor: "#D8A05E",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#3A2F2F" }}>
          Logout
        </Text>
      </TouchableOpacity>

      <Link href="/">Back Home</Link>
    </View>
  );
}





