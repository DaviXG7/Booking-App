import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import React, {useEffect, useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import {Pressable, StyleSheet, TextInput} from "react-native";
import {getCustomers, getUsers} from "@/hooks/useUsers";
import {RequestForm} from "@/types/Form";
import {makeRequest} from "@/hooks/useRequest";
import NotificationBox, {NotificationMessage} from "@/app/defaults/NotificationBox";
import {User} from "@/types/User";
import {Professional} from "@/types/Professional";

export default function() {

    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        getCustomers().then((users) => {
            console.log(users)
            return setUsers(users);
        })
    }, []);

    const [message, setMessage] = useState<NotificationMessage | null>(null)

    const [formData, setFormData] = useState<RequestForm>({
        url: "http://127.0.0.1:8000/professional/register/",
        method: "POST",
        params: [
            {key: "id_user", value: null, isRequired: true},
            {key: "role", value: null, isRequired: true},
            {key: "phone_number", value: null, isRequired: true},
            {key: "pix", value: null, isRequired: true},
            {key: "bank_name", value: null, isRequired: true},
            {key: "account_number", value: null, isRequired: true},
            {key: "agency", value: null, isRequired: true},
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
        makeRequest(formData).then(async r => {
            if (r.status === 200) {
                setMessage({
                    message: "Profissional registrado com sucesso!",
                    type: "success"
                });
                return
            }

            const data = await r.json();

            setMessage({
                message: "Erro ao registrar profissional " + data.message,
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
                <ThemedText type={"title"} style={{margin: 5, textAlign: "center"}}>Registrar profissional</ThemedText>

                <Dropdown
                    style={styles.input}
                    data={users}
                    maxHeight={300}
                    placeholderStyle={{padding: 20}}
                    labelField="name"
                    valueField="id"
                    placeholder={"Selecione o usuário*"}
                    value={formData.params.find(p => p.key === "id_user")?.value}
                    onChange={item => handleChange("id_user", item.id)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Digite o Cargo do profissional*"
                    onChangeText={(i) => handleChange("role", i)}
                />

                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Digite o número de telefone"
                    onChangeText={(i) => handleChange("phone_number", i)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Digite a chave PIX"
                    onChangeText={(i) => handleChange("pix", i)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do banco"
                    onChangeText={(i) => handleChange("bank_name", i)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Número da conta"
                    keyboardType="numeric"
                    onChangeText={(i) => handleChange("account_number", i)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Agência"
                    keyboardType="numeric"
                    onChangeText={(i) => handleChange("agency", i)}
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
