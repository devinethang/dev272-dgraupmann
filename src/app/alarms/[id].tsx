// src/app/alarms/[id].tsx
import { alarms } from "@/data/alarms";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function alarmDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alarm = alarms.find((p) => p.id === id);

  if (!alarm) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text>No alarm with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: alarm.name }} />
      <Text style={styles.title}>{alarm.name}</Text>
      <Text style={styles.sub}>{alarm.time}</Text>
      <Text style={styles.sub}>{alarm.selector}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 24, fontWeight: "600" },
  sub: { color: "#6b7280" },
});