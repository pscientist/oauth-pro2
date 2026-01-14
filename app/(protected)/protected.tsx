import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ProtectedPage() {
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

      <Link href="/">Back Home</Link>
    </View>
  );
}





