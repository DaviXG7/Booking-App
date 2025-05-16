import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import {StyleSheet} from "react-native";

export default function EditUsers() {
    const days = [

        {label: "Domingo", value: 0},
        {label: "Segunda", value: 1},
        {label: "Terça", value: 2},
        {label: "Quarta", value: 3},
        {label: "Quinta", value: 4},
        {label: "Sexta", value: 5},
        {label: "Sábado", value: 6}
    ]

    const [value, setValue] = useState<string>();

    return (
        <ThemedView style={styles.screen}>
            <ThemedView
                style={styles.form}
                lightColor="#fff"
                darkColor="#000"
            >
                <ThemedText type={"title"}>Criar agendamento</ThemedText>

                {/*<Dropdown*/}
                {/*    style={styles.input}*/}
                {/*    data={getServices()}*/}
                {/*    maxHeight={300}*/}
                {/*    placeholderStyle={{padding: 20}}*/}
                {/*    labelField="label"*/}
                {/*    valueField="value"*/}
                {/*    placeholder={"Selecione o serviço"}*/}
                {/*    value={value}*/}
                {/*    onChange={item => {*/}
                {/*        setValue(item)*/}
                {/*    }}*/}
                {/*/>*/}

                <Dropdown
                    style={styles.input}
                    data={days}
                    maxHeight={300}
                    placeholderStyle={{padding: 20}}
                    labelField="label"
                    valueField="value"
                    placeholder={"Selecione o dia da semana"}
                    value={value}
                    onChange={item => {
                        setValue(item)
                    }}
                />

            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create(
    {
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        form: {
            width: '80%',
            padding: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        input: {
            width: '90%',
            height: 40,
            borderWidth: 1,
            borderColor: '#000',
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#eee"
        }

    }
)