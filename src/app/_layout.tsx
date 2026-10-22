import { AlarmProvider } from "@/context/AlarmContext";
import { TimerProvider } from "@/context/TimerContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AlarmProvider>
      <TimerProvider>
          <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="alarms/[id]" options={{ title: "Edit Alarm" }} />
              <Stack.Screen name="AddAlarm" options={{ title: "New Alarm" }} />
          </Stack>
      </TimerProvider>
    </AlarmProvider>
  );
}