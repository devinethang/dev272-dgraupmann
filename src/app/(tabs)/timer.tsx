import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function index() {
const [hours, setHours] = useState<string>("");
const [minutes, setMinutes] = useState<string>("");
const [seconds, setSeconds] = useState<string>("");


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
                    <Pressable onPress={() => console.log({hours, minutes, seconds})}>
                    <Text style={styles.searchButton}>Set</Text>
                    </Pressable>
                </View>

            </View>

        </View>
    )
}

export const styles = StyleSheet.create({
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
    alignItems: 'center'
  },

    searchButton: {
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