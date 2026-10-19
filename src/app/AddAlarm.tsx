import {TextInput, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text} from "react-native";
import {useState} from "react";
import handleSubmit from "@/components/NewAlarm";

export default function addAlarm { 
    type AlarmForm = { name: string; time: string; selector: string };

    const [form, setForm] = useState<AlarmForm>({ name: "", time: "", selector: ""});

    const update = <K extends keyof AlarmForm>(key: K, value: AlarmForm[K]) =>
    setForm((current) => ({ ...current, [key]: value }));


    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
  <ScrollView
    contentContainerStyle={}
    keyboardShouldPersistTaps="handled"
  >
    
    <TextInput value={form.name} onChangeText={(t) => update("name", t)} />

    <Pressable style={} onPress={() => { Keyboard.dismiss(); handleSubmit(); }}>
      <Text>Save</Text>
    </Pressable>
  </ScrollView>
</KeyboardAvoidingView>

}




