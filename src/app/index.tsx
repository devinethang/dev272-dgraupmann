import { alarms } from "@/data/alarms";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
// This is the home screen (route "/").
// Week 1: change the two lines marked 👇, run the app, commit, push.
export default function Index() {
  return (
    <FlatList
    data={(alarms)}
    renderItem={(r) => <AlarmFolder Alarm={r}/>}
    ListHeaderComponent={<Header/>}
    />
  );
}

function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarms</Text>
      <View>
        <Pressable onPress={() => console.log("Folder Interaction")}>
          <Text>Folder1</Text>
        </Pressable>
      </View>
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
  body: {
    fontSize: 16,
    textAlign: "center",
  },
  hint: {
    marginTop: 24,
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
});
