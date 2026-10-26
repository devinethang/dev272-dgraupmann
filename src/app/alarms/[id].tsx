// src/app/alarms/[id].tsx

import { fetchAlarm, updateAlarm } from "@/api/alarms";
import { styles } from "@/styles/universal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { AlarmData, AlarmFormValues, alarmSchema } from "../../utils/alarmSchema";

export default function AlarmDetail() {
  
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: alarm, isPending } = useQuery({
    queryKey: ["alarms", id],
    queryFn: () => fetchAlarm(id),
    enabled: !!id,
  });

  const saveAlarm = useMutation({
    mutationFn: (input: AlarmData) => updateAlarm(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alarms"] });
      router.back();
    },
    onError: (e) => Alert.alert("Could not save", e.message),
  })
  
  const { control, handleSubmit, formState: { errors } } =
    useForm<AlarmFormValues, unknown, AlarmData>({
      resolver: zodResolver(alarmSchema),
      values: alarm ? {name: alarm.name, time: alarm.time, selector: alarm.selector, snooze: String(alarm.snooze)} : undefined,
      mode: "onTouched",
    });

    const onSubmit = (data: AlarmData) => { 
      Keyboard.dismiss();
      saveAlarm.mutate(data);
    };

  if (isPending) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

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

      <View style={styles.dataDisplay}>

        <Text style={styles.fieldRow}>
            Alarm Time:
            <Text style={styles.alarmData}>  {alarm.time} {alarm.selector} </Text>
         </Text>
        
        <Text style={styles.fieldRow}>
            Alarm Name:
            <Text style={styles.alarmData}>  {alarm.name} </Text>
         </Text>

        <Text style={styles.fieldRow}>
            Time added on Snooze:
            <Text style={styles.alarmData}>  {alarm.snooze}m </Text>
         </Text>

      </View>

      <Text> Alarm Time</Text>

      <View style={[styles.searchBar]}>
        
        <Controller
          control={control}
          name="time"
          render={({ field: {value, onChange, onBlur } }) => (
            <TextInput
              style={[styles.input, styles.timeInput, errors.time && styles.inputError, styles.item]} 
              placeholder={alarm.time}
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
              placeholder={alarm.name}
              value={value}
              onChangeText={onChange}
              autoCapitalize="words"
              returnKeyType="done"
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
            placeholder={String(alarm.snooze)}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            returnKeyType="done"
            onBlur={onBlur}
            keyboardType="number-pad"
          />  
        )}
      />
      {errors.snooze ? <Text style={styles.error}>{errors.snooze.message}</Text> : null}

      <Pressable onPress={handleSubmit(onSubmit)} disabled={saveAlarm.isPending} >
        <Text style={styles.searchButton}>{saveAlarm.isPending ? "Saving…" : "Save"}</Text>
      </Pressable>
    </View>
  </ScrollView>
</KeyboardAvoidingView>
  );
}