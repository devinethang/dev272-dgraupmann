// src/app/_layout.tsx  (root)
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="alarms/[id]" options={{ title: "Place" }} />
    </Stack>
  );
}