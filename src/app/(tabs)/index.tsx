import AlarmFolder from "@/components/AlarmFolder";
import { useAlarms } from "@/context/AlarmContext";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

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
        />
      </View>

      <View style={styles.newAlarm}>
        <Link style={styles.editButton} href={{ pathname: "/AddAlarm"}}>New Alarm</Link>
      </View>

    </View>
  );
}

export const styles = StyleSheet.create({
  main: {
    backgroundColor: "#b0c2e6",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  list: { 
    padding: 16,
    gap: 0
  },
  row: {
    padding: 12,
    backgroundColor: "#95a7ca",
    flexDirection: 'column',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
    gap: 2
  },
  rowTitle: {
    fontWeight: "600" 
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    backgroundColor: '#95a7ca',
    borderRadius: 8,
  },
  searchButton: {
    opacity: 10,
    borderRadius: 8,
    borderWidth: 1,
    padding: 5
  },
  editButton: {
    textAlign: 'right',
    flexDirection: 'row',
  },
  alarmInfo: {
    justifyContent: "space-between",
    flexDirection: 'row',
  },
  newAlarm: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    backgroundColor: '#95a7ca',
    borderRadius: 8,
    padding: 5
  }
});
