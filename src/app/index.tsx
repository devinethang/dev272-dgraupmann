import { Alarm, alarms } from "@/data/alarms";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <FlatList
    data={(alarms)}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <AlarmFolder alarm={ item } />}
    ListHeaderComponent={<Header/>}
    contentContainerStyle={styles.list}
    />
  );
}

function Header() {
  const [query, setQuery] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarms</Text>
      <View style={styles.searchBar}>
        <TextInput 
        placeholder="Search Alarms"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        returnKeyType="search"
        />
        <Pressable onPress={() => console.log({query})}>
          <Text>Go</Text>
        </Pressable>
      </View>
    </View>
  );
}

function AlarmFolder({ alarm }: { alarm: Alarm }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{alarm.name}</Text>
      <Text> {alarm.time} {alarm.selector}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    gap: 8 
  },
  row: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#95a7ca",
    flexDirection: 'column'
  },
  rowTitle: {
    fontWeight: "600" 
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap:10
  },
});
