import {TextInput, Switch} from "react-native";
import {useState} from "react";

export default function addAlarm { 
    type AlarmForm = { name: string; time: string; selector: string };

    const [form, setForm] = useState<AlarmForm>({ name: "", time: "", selector: ""});

    const update = <K extends keyof AlarmForm>(key: K, value: AlarmForm[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

    <TextInput value={form.name} onChangeText={(t) => update("name", t)} />
}