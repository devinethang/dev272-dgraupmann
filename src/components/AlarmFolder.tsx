import { styles } from "@/styles/universal";
import { Alarm } from "@/utils/alarmSchema";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function AlarmFolder({ alarm }: { alarm: Alarm }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{alarm.name}</Text>
      <View style = {styles.alarmInfo}> 
        <Text> {alarm.time} {alarm.selector} </Text>
        <Text> Snooze Time: {alarm.snooze} min </Text>
        <Link style={[styles.editButton]} href={{ pathname: "/alarms/[id]", params: {id: alarm.id } }}>Edit</Link>
      </View>
      
    </View>
  );
}
