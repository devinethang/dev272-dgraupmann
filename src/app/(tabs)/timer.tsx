import { useTimer } from "@/context/TimerContext";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function index() {
    const [hours, setHours] = useState<string>("");
    const [minutes, setMinutes] = useState<string>("");
    const [seconds, setSeconds] = useState<string>("");

    const { remaining, startTimer } = useTimer();

    const displayHours = Math.floor(remaining / 3600);
    const displayMinutes = Math.floor((remaining % 3600) / 60);
    const displaySeconds = Math.floor ((remaining % 60));

    // formated values, converted to string
    const hh = displayHours.toString().padStart(2, "0");
    const mm = displayMinutes.toString().padStart(2, "0");
    const ss = displaySeconds.toString().padStart(2, "0");

    return (
        <View style={styles.body}>
            <View style={[styles.Header, styles.row]}>
                <View style={styles.item}>
                    <Text> Hours </Text>
                    <TextInput
                    placeholder={"00"}
                    value={hours}
                    onChangeText={setHours}
                    />
                </View>
                
                <View style={styles.item}>
                    <Text> Minutes </Text>
                    <TextInput
                    placeholder={"00"}
                    value={minutes}
                    onChangeText={setMinutes}
                    />
                </View>

                <View style={styles.item}>
                    <Text> Seconds </Text>
                    <TextInput
                    placeholder={"00"}
                    value={seconds}
                    onChangeText={setSeconds}
                    />
                </View>

                <View style={styles.searchBar}>
                    <Pressable onPress={(handleStart)}>
                    <Text style={styles.searchButton}>Start</Text>
                    </Pressable>
                </View>

                

            </View>
        <View style={[styles.item, styles.row, styles.timer]}>

            <Text>
                {hh} : {mm} : {ss}
            </Text>

        </View>
        </View>

        
    )

    function handleStart() {
    const h = Number(hours);
    const m = Number(minutes);
    const s = Number(seconds);

    const totalSeconds = (h * 3600) + (m * 60) + s;
    
    startTimer(totalSeconds);
}
}



export const styles = StyleSheet.create({
    timer: {
        flexDirection: 'row'
    },

    Header: {
        padding: 0
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

  body:
  {
    backgroundColor: "#b0c2e6",
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },

    searchButton:
    {
        opacity: 10,
        borderRadius: 8,
        borderWidth: 1,
        padding: 5
    },

  searchBar: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    backgroundColor: '#95a7ca',
    borderRadius: 8,
    padding: 10
  },
})