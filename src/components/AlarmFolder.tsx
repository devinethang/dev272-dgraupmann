import { Alarm } from "@/utils/alarmSchema";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AlarmFolder({ alarm }: { alarm: Alarm }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{alarm.name}</Text>
      <View style = {styles.alarmInfo}> 
        <Text> {alarm.time} {alarm.selector} </Text>
        <Text> Snooze Time: {alarm.snooze} </Text>
        <Link style={styles.editButton} href={{ pathname: "/alarms/[id]", params: {id: alarm.id } }}>Edit</Link>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
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
  editButton: {
    textAlign: 'right',
    flexDirection: 'row',
  },
  alarmInfo: {
    justifyContent: "space-between",
    flexDirection: 'row',
  }
});
