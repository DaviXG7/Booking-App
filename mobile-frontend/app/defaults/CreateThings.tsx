import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import {useCurrentUser} from "@/hooks/useUser";
import {router} from "expo-router";

export default function CreateThings() {
    const [selectedValue, setSelectedValue] = useState("Selecione...");

    const user = useCurrentUser();

    const options = [
        { label: "Reservar atendimento", value: "1" },
    ];

    if (user?.role == "ADMIN") {
        options.push(
            { label: "Criar serviço", value: "2" },
            { label: "Criar agenda", value: "3" },
            { label: "Cadastrar profissional", value: "4" }
        )
    }



    return (
            <Dropdown
                style={styles.btn}
                data={options}
                maxHeight={300}
                placeholderStyle={{padding: 20}}
                labelField="label"
                valueField="value"
                placeholder={"Criar..."}
                onChange={item => {

                    switch (item.value) {
                        case "1":
                            router.push("/create/CreateBookings");
                            break;
                        case "2":
                            router.push("/create/CreateService");
                            break;
                        case "3":
                            router.push("/create/CreateAgenda");
                            break;
                        case "4":
                            router.push("/create/RegisterProfessional");
                            break;
                        default:
                            break;
                    }
                }}
            />
    );
}

const styles = StyleSheet.create({
    btn: {
        width: "80%",
        height: 50,
        backgroundColor: "gray",
        textAlign: "center",
        borderRadius: 20,
        margin: 20
    }
});