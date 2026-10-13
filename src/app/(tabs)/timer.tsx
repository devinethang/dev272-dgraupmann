import { StyleSheet, Text, TextInput, View } from "react-native";


export default function index() {

    return (
        <View>
            <View style={styles.Header}>
                <Text> Hours </Text>
                <Text> Minutes </Text>
                <Text> Seconds </Text>
            </View>

            {/* Add Text Inputs here */}
            <View>
                {/* Hours, Minutes, Seconds */}
                <TextInput placeholder={"00"}/>
                <TextInput placeholder={"00"}/>
                <TextInput placeholder={"00"}/>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    Header: {
        padding: 0
    }
})