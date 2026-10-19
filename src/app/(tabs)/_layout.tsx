// src/app/(tabs)/_layout.tsx
import MiniTimer from "@/components/MiniTimer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { BottomTabBar } from "expo-router/build/react-navigation/bottom-tabs";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ tabBarActiveTintColor: "#2563eb" }}
      tabBar={(props) => (
        <View>
          <MiniTimer/>
          <BottomTabBar {...props}/>
        </View>

      )
    }
    >
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