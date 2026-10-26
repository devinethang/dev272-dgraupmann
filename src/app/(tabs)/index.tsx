// Passes final checks - 10/21/2026

import { fetchAlarms } from "@/api/alarms";
import AlarmFolder from "@/components/AlarmFolder";
import { styles } from "@/styles/universal";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";


export default function Index() {
  const { data: alarms, isPending, isError, error, 
    refetch, isRefetching } = useQuery({
      queryKey: ["alarms"],
      queryFn: fetchAlarms,
    });

  const [query, setQuery] = useState<string>("");

    if (isPending) {
      return <View style={styles.center}><ActivityIndicator size="large" /></View>;
    }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error.message}</Text>
        <Pressable onPress={() => refetch()}><Text style={styles.link}>Try again</Text></Pressable>
      </View>
    );
  }

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
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text>No alarms yet.</Text>}
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