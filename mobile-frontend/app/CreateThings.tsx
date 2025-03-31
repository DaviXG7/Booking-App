import {Text, View} from "react-native";
import {useState} from "react";

export default function CreateThings() {
    const [selectedValue, setSelectedValue] = useState("Selecione...");

    const options = [
        { key: "java", label: "Java" },
        { key: "javascript", label: "JavaScript" },
        { key: "python", label: "Python" },
    ];

    return (

        <View>
            <Text>Selecione uma linguagem:</Text>

        </View>
    );
}