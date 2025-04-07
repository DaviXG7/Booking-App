import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";

export default function CreateThings() {
    const [selectedValue, setSelectedValue] = useState("Selecione...");

    const options = [
        { key: "java", label: "Java" },
        { key: "javascript", label: "JavaScript" },
        { key: "python", label: "Python" },
    ];

    return (
            <View style={styles.btn}>
                <Text>Selecione uma linguagem:</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        position: "relative",
        end: 15,
        right: 15,
        width: 50,
        height: 50,
        backgroundColor: "blue"
    }
});