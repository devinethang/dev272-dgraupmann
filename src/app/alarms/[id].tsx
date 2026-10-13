// src/app/alarms/[id].tsx
import { alarms } from "@/data/alarms";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";


export default function alarmDetail() {
    
  const [query, setQuery] = useState<string>("");  
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
    <View style={[styles.main, styles.container]}>
        <Stack.Screen options={{ title: "Alarm Info" }} />

        <View style={styles.searchBar}>
            <TextInput
            style={styles.item} 
            placeholder={alarm.time + " " + alarm.selector}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            returnKeyType="search"
            />
            <Pressable onPress={() => console.log({query})}>
              <Text style={styles.searchButton}>Set</Text>
            </Pressable>
        </View>


       
        <View style={styles.searchBar}>
            <TextInput
            style={styles.item} 
            placeholder={alarm.name}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            returnKeyType="search"
            />
            <Pressable onPress={() => console.log({query})}>
              <Text style={styles.searchButton}>Set</Text>
            </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  title: { fontSize: 24, fontWeight: "600" },
  item: {
    fontSize: 30,
    textAlign: 'center',
    padding: 5
  },
    searchBar: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    backgroundColor: '#95a7ca',
  },
  searchButton: {
    opacity: 10,
    borderRadius: 8,
    borderWidth: 1,
    padding: 5
  },
  main: {
    backgroundColor: "#b0c2e6",
    flex: 1,
  },

});