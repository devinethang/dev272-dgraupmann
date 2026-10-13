// src/app/_layout.tsx  (root)
import { TimerProvider } from "@/context/TimerContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TimerProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="alarms/[id]" options={{ title: "Place" }} />
        </Stack>
    </TimerProvider>
  );
}