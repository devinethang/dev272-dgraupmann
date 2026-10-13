import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function index() {
const [hours, setHours] = useState<string>("");
const [minutes, setMinutes] = useState<string>("");
const [seconds, setSeconds] = useState<string>("");

const [endTime, setEndTime] = useState<number | null>(null)
const [remaining, setRemaining] = useState<number>(0);

const displayHours = Math.floor(remaining / 3600);
const displayMinutes = Math.floor((remaining % 3600) / 60);
const displaySeconds = Math.floor ((remaining % 60));

useEffect(() => {
    if (endTime === null) {
        return;
    }

    const interval = setInterval(() => {
        const timeLeft = Math.ceil((endTime - Date.now()) / 1000 );

        if (timeLeft > 0) {
            setRemaining(timeLeft);
        } 
        else {
            setRemaining(0);
            clearInterval(interval);
        }

    }, 1000)

    return () => clearInterval(interval);

 }, [endTime]);

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
                {displayHours} : {displayMinutes} : {displaySeconds}
            </Text>

        </View>
        </View>

        
    )

    function handleStart() {
    const h = Number(hours);
    const m = Number(minutes);
    const s = Number(seconds);

    const totalSeconds = (h * 3600) + (m * 60) + s;
    setRemaining(totalSeconds);

    console.log(totalSeconds);

    setEndTime(Date.now() + totalSeconds * 1000);

    console.log("Timer ends in: " + endTime);
    
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