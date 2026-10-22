// src/app/AddAlarm.tsx

import { useAlarms } from "@/context/AlarmContext";
import { styles } from "@/styles/universal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { AlarmData, AlarmFormValues, alarmSchema } from "../utils/alarmSchema";

export default function AddAlarm() {
  
  const { addAlarm } = useAlarms();
  const router = useRouter();
  
  const { control, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<AlarmFormValues, unknown, AlarmData>({
      resolver: zodResolver(alarmSchema),
      defaultValues: {name: "", time: "", selector: "AM", snooze: ""},
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
                style={[styles.input, styles.timeInput, errors.time && styles.inputError, styles.item]} 
                placeholder={"00:00"}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                returnKeyType="done"
                keyboardType="numbers-and-punctuation"
              />        
            )}
          />
          
            
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

          
        </View>
        <View>
          <Text>
          {errors.time ? <Text style={styles.error}>{errors.time.message}</Text> : null}
          {errors.selector ? <Text style={styles.error}>{errors.selector.message}</Text> : null}
          </Text>
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
                style={[styles.input, errors.name && styles.inputError, styles.item]} 
                placeholder={"Name"}
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                returnKeyType="search"
                onBlur={onBlur}
              />  
            )}
          />
          {errors.name ? <Text style={styles.error}>{errors.name.message}</Text> : null}
        </View>

      <View>
        <Text> Snooze (minutes) </Text>
      </View>

      <Controller
        control={control}
        name="snooze"
        render={({ field: {value, onChange, onBlur } }) => (
          <TextInput
            style={[styles.input, errors.snooze && styles.inputError, styles.item]} 
            placeholder={"5"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            returnKeyType="search"
            onBlur={onBlur}
            keyboardType="number-pad"
          />  
        )}
      />
      {errors.snooze ? <Text style={styles.error}>{errors.snooze.message}</Text> : null}

        <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting} >
          <Text style={styles.searchButton}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>

  );
}