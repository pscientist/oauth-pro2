import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from "../env";

export default function RootLayout() {
  const publishableKey =
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Set it in your .env (see Clerk Expo quickstart) or in env.ts."
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const isLoggedIn = isLoaded && isSignedIn;

  return (
    <Stack>
      {/* Only available when NOT logged in */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
      </Stack.Protected>

      {/* Only available when logged in */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen
          name="(protected)/protected"
          options={{ title: "Protected" }}
        />
      </Stack.Protected>

      {/* Public screens */}
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}