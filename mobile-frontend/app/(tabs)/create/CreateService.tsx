import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import React, {useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import {Pressable, StyleSheet, TextInput} from "react-native";
import {getCustomers} from "@/hooks/useUsers";
import {RequestForm} from "@/types/Form";
import {makeRequest} from "@/hooks/useRequest";
import NotificationBox, {NotificationMessage} from "@/app/defaults/NotificationBox";

export default function() {

    const [message, setMessage] = useState<NotificationMessage | null>(null)

    const [formData, setFormData] = useState<RequestForm>({
        url: "",
        method: "POST",
        params: [
            {key: "name", value: null, isRequired: true},
            {key: "value", value: null, isRequired: true}
        ]
    });

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            params: prev.params.map(param =>
                param.key === key ? { ...param, value } : param
            )
        }));
    };

    const handleSubmit = () => {
        console.log(formData);
        makeRequest(formData).then(r => {
            if (r.status === 200) {
                setMessage({
                    message: "Serviço registrado com sucesso!",
                    type: "success"
                });
                return
            }
            setMessage({
                message: "Erro ao registrar serviço",
                type: "error"
            });

        }).catch((e) => {
            console.log(e);
            setMessage({
                message: "Preencha todos os campos obrigatórios",
                type: "warning"
            });
        });
    };

    return (
        <ThemedView style={styles.screen}>
            <ThemedView style={styles.form} lightColor="#fff" darkColor="#000">
                <ThemedText type={"title"} style={{margin: 5, textAlign: "center"}}>Registrar serviço</ThemedText>

                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do serviço*"
                    onChangeText={(i) => handleChange("name", i)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Digite o valor do serviço em R$*"
                    onChangeText={(i) => handleChange("value", i)}
                />

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <ThemedText lightColor="#FFF" darkColor="#000">Enviar</ThemedText>
                </Pressable>
                <ThemedText style={{fontSize: 14}}>* Obrigatório</ThemedText>
            </ThemedView>
            <NotificationBox
                message={message?.message ?? ""}
                type={message?.type ?? "success"}
                visible={message != null}
                onClose={() => setMessage(null)}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
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
        borderRadius: 20,
        boxShadow: "0 0 10px #000",
        textAlign: "center"
    },
    input: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#eee",
        marginVertical: 7,
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor: "#0000ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        marginTop: 10,
    }
});
