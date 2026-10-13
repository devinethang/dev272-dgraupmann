import { useTimer } from "@/context/TimerContext";
import { StyleSheet, Text, View } from "react-native";

export default function MiniTimer() {
    const { remaining } = useTimer();

    const displayHours = Math.floor(remaining / 3600);
    const displayMinutes = Math.floor((remaining % 3600) / 60);
    const displaySeconds = Math.floor ((remaining % 60));

    // formated values, converted to string
    const hh = displayHours.toString().padStart(2, "0");
    const mm = displayMinutes.toString().padStart(2, "0");
    const ss = displaySeconds.toString().padStart(2, "0");

    return (
        <View style={[styles.item, styles.row, styles.timer]}>
            <Text>
                Timer: {hh} hrs: {mm} mins: {ss} secs
            </Text>
        </View>
    );    
}

export const styles = StyleSheet.create({ 
    timer: {
        flexDirection: 'row'
    },

    row: {
        padding: 12,
        backgroundColor: "#95a7ca",
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        alignContent: 'center'
    },

    item: {
        flexDirection: 'column',
    },
})