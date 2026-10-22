// Passes final checks - 10/21/2026

import AlarmFolder from "@/components/AlarmFolder";
import { useAlarms } from "@/context/AlarmContext";
import { styles } from "@/styles/universal";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function Index() {
  const { alarms } = useAlarms();

  const [query, setQuery] = useState<string>("");

  const filteredAlarms = alarms.filter (
    (alarm) => alarm.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <FlatList
    style={styles.main}
    data={(filteredAlarms)}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <AlarmFolder alarm={ item } />}
    ListHeaderComponent={<Header query={query} setQuery={setQuery}/>}
    contentContainerStyle={styles.list}
    />
  );
}

function Header({query, setQuery,}: {query: string; setQuery: (text: string) => void;}) {
  
  return (
    <View style={[styles.container, styles.main]}>
      <Text style={styles.title}>Alarms</Text>
      <View style={styles.searchBar}>
        <TextInput 
        placeholder="Search Alarms"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        returnKeyType="search"
        style={styles.input}
        />
      </View>

      <View style={styles.newAlarm}>
        <Link style={styles.editButton} href={{ pathname: "/AddAlarm"}}>New Alarm</Link>
      </View>

    </View>
  );
}