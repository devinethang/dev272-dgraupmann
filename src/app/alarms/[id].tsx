// src/app/alarms/[id].tsx
import editAlarm from "@/components/EditAlarm";
import { alarms } from "@/data/alarms";
import { Picker } from "@react-native-picker/picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AlarmData, AlarmErrors } from "../utils/validateAlarm";

export default function AlarmDetail() {
  
  const { id } = useLocalSearchParams<{ id: string }>();
  const alarm = alarms.find((p) => p.id === id);
  
  const [form, setForm] = useState<AlarmData>({
    name: "",
    time: "",
    selector: "AM",
  });

  const [errors, setErrors] = useState<AlarmErrors>({});

  const updateField = <K extends keyof AlarmData>(key: K, value: AlarmData[K]) =>
  setForm((current) => ({ ...current, [key]: value }));


  if (!alarm) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text>No alarm with id {id}.</Text>
      </View>
    );
  }

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
      <Stack.Screen options={{ title: alarm.name }} />

      <View>
        <Text>Alarm Time: {alarm.time} {alarm.selector} </Text>
          <Text>Alarm Name: {alarm.name}</Text>
      </View>

      <Text> Alarm Time</Text>

      <View style={[styles.searchBar]}>
        <TextInput
          style={[styles.input, errors.name && styles.inputError, styles.item]} 
          placeholder={alarm.time}
          value={form.time}
          onChangeText={(text) => updateField("time", text)}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
          
        <Picker selectedValue={form.selector} onValueChange={(value) => updateField("selector", value)}
          style={[styles.input, errors.name && styles.inputError, styles.item, styles.timeOfDay]}>

          <Picker.Item label="AM" value="AM" style={styles.item} />
          <Picker.Item label="PM" value="PM" style={styles.item} />

        </Picker>
        {errors.selector ? <Text style={styles.error}>{errors.name}</Text> : null}
      </View>

      <View>
        <Text> Alarm Name</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.item} 
          placeholder={alarm.name}
          value={form.name}
          onChangeText={(text) => updateField("name", text)}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
      </View>

      <Pressable onPress={() =>  { Keyboard.dismiss(); editAlarm( {form} ); }}>
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

  },
  input: { borderWidth: 1, borderColor: "#9ca3af", borderRadius: 8, padding: 10 },
  inputError: { borderColor: "#dc2626" },
  error: { color: "#dc2626", fontSize: 12 },
  label: { fontWeight: "600" },

});