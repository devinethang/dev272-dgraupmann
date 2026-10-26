import { TimerProvider } from "@/context/TimerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,   // data is "fresh" for a minute; no refetch on remount during that window
      retry: 1,               // one retry on failure before showing the error
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
        <TimerProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="alarms/[id]" options={{ title: "Edit Alarm" }} />
                <Stack.Screen name="AddAlarm" options={{ title: "New Alarm" }} />
            </Stack>
        </TimerProvider>
    </QueryClientProvider>
  );
}