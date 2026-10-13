// src/app/(tabs)/_layout.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2563eb" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Alarms",
          tabBarIcon: ({ color, size }) => <Ionicons name="alarm-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: "Timer",
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}