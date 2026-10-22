// src/app/alarms/[id].tsx
import handleSubmit from "@/components/NewAlarm";
import { alarms } from "@/data/alarms";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AlarmData } from "./utils/alarmSchema";

export default function AlarmDetail() {
  
  const { id } = useLocalSearchParams<{ id: string }>();
  const alarm = alarms.find((p) => p.id === id);
  
  const [form, setForm] = useState<AlarmData>({
    name: "",
    time: "",
    selector: "AM",
  });

  const updateField = <K extends keyof AlarmData>(key: K, value: AlarmData[K]) =>
  setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    > 
  <ScrollView
    contentContainerStyle={styles.form}
    keyboardShouldPersistTaps="handled"
  >
    <View style={[styles.main, styles.container]}>
      
      <Text> Alarm Time</Text>
      <View style={[styles.searchBar]}>
        <TextInput
          style={styles.item} 
          placeholder={"00:00"}
          value={form.time}
          onChangeText={(text) => updateField("time", text)}
          autoCapitalize="none"
          returnKeyType="search"
        />
          
        <Picker selectedValue={form.selector} onValueChange={(value) => updateField("selector", value)} style={styles.timeOfDay}>
          <Picker.Item label="AM" value="AM" style={styles.item} />
          <Picker.Item label="PM" value="PM" style={styles.item} />
        </Picker>
      </View>

      <View>
        <Text> Alarm Name</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.item} 
          placeholder={"Name"}
          value={form.name}
          onChangeText={(text) => updateField("name", text)}
          autoCapitalize="none"
          returnKeyType="search"
        />
      </View>

      <Pressable onPress={() =>  { Keyboard.dismiss(); handleSubmit({form}); }}>
        <Text style={styles.searchButton}>Save</Text>
      </Pressable>
    </View>
  </ScrollView>
</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
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
    backgroundColor: "#95a7ca",
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
  timeOfDay: {
    flex: 1,
    textAlign: "right"
  },
  form: {

  }

});