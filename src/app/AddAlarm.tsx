// src/app/AddAlarm.tsx

import { useAlarms } from "@/context/AlarmContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AlarmData, AlarmFormValues, alarmSchema } from "../utils/alarmSchema";

export default function AddAlarm() {
  
  const { addAlarm } = useAlarms();
  const router = useRouter();
  
  const { control, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<AlarmFormValues, unknown, AlarmData>({
      resolver: zodResolver(alarmSchema),
      defaultValues: {name: "", time: "", selector: "AM"},
      mode: "onTouched",
  });

  const onSubmit = (data: AlarmData) => {
    Keyboard.dismiss();
    addAlarm({ ...data, id: Date.now().toString() });
    router.back();
  };

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
        <Stack.Screen options={{ title: "New Alarm" }} />

        <Text> Alarm Time</Text>

        <View style={[styles.searchBar]}>
          
          <Controller
            control={control}
            name="time"
            render={({ field: {value, onChange, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.time && styles.inputError, styles.item]} 
                placeholder={"00:00"}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                returnKeyType="done"
              />        
            )}
          />
          {errors.time ? <Text style={styles.error}>{errors.time.message}</Text> : null}
            
          <Controller
            control={control}
            name="selector"
            render={({ field: {value, onChange} }) => (

            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={[styles.input, errors.selector && styles.inputError, styles.item, styles.timeOfDay]}
            >

              <Picker.Item label="AM" value="AM" style={styles.item} />
              <Picker.Item label="PM" value="PM" style={styles.item} />
            </Picker>
            )}
          />

          {errors.selector ? <Text style={styles.error}>{errors.selector.message}</Text> : null}
        </View>

        <View>
          <Text> Alarm Name</Text>
        </View>

        <View>
          <Controller
            control={control}
            name="name"
            render={({ field: {value, onChange, onBlur } }) => (
              <TextInput
                style={styles.item} 
                placeholder={"Name"}
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                returnKeyType="search"
                onBlur={onBlur}
              />  
            )}
          />
          {errors.name ? <Text style={styles.error}>{errors.name.message}</Text> : null}

        </View>

        <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting} >
          <Text style={styles.searchButton}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>

  );
}

export const styles = StyleSheet.create({
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
    opacity: 1,
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