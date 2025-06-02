import {Image, Modal, Pressable, StyleSheet, TextInput} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import { Screen } from "./Screen";
import React, {useState} from "react";
import {RequestForm} from "@/types/Form";
import {makeRequest} from "@/hooks/useRequest";
import NotificationBox, {NotificationMessage} from "@/app/defaults/NotificationBox";
import {isLogged, login} from "@/hooks/useUser";
import {User} from "@/types/User";
import {Professional} from "@/types/Professional";


export default function RegisterModal({screenChangeRequest: setScreen}: {screenChangeRequest: ((screen: Screen | undefined) => void)}) {

    const [formData, setFormData] = useState<RequestForm>({
        url: "http://127.0.0.1:8000/user/register",
        method: "POST",
        params: [
            {key: "name", value: null, isRequired: true},
            {key: "email", value: null, isRequired: true},
            {key: "password", value: null, isRequired: true},
        ]
    });

    const [message, setMessage] = useState<NotificationMessage | null>(null)


    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            params: prev.params.map(param =>
                param.key === key ? { ...param, value } : param
            )
        }));
    };

    const handleSubmit = () => {
        makeRequest(formData).then(async r => {
            console.log(r)
            if (r.status === 201) {
                setMessage({
                    message: "Usuário cadastrado com sucesso!",
                    type: "success"
                });
                r.json().then(user => {
                    console.log(user)
                    login(user)
                    if (isLogged()) setScreen(undefined)
                })
                return;
            }
            const data = await r.json();
            setMessage({
                message: "Erro ao cadastrar usuário: " + data.message,
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
            }}>
            <ThemedView style={styles.centeredView}>

                <Image
                    source={require('@/assets/images/booking.png')}
                    style={styles.logo}
                />

                <ThemedText type={"subtitle"}>Registrar no Booking app</ThemedText>

                <ThemedView style={styles.modalView} lightColor={'#f7f7f7'} darkColor={'#222'}>
                    <TextInput style={styles.input} placeholder={"Digite seu nome"} onChangeText={(text) => handleChange("name", text)} />
                    <TextInput style={styles.input} placeholder={"Digite seu email"} onChangeText={(text) => handleChange("email", text)} />
                    <TextInput secureTextEntry={true} style={styles.input}  placeholder={"Digite sua senha"} onChangeText={(text) => handleChange("password", text)} />
                    <Pressable style={styles.button} onPress={handleSubmit} >
                        <ThemedText>Cadastrar</ThemedText>
                    </Pressable>
                    <Pressable style={{ margin: 2 }} onPress={() => {setScreen("LOGIN")}} >
                        <ThemedText>Já tem uma conta? Logar</ThemedText>
                    </Pressable>
                </ThemedView>

            </ThemedView>
            <NotificationBox
                message={message?.message ?? ""}
                type={message?.type ?? "success"}
                visible={message != null}
                onClose={() => setMessage(null)}
            />

        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: "blur(5px)"
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    logo: {
        width: 100,
        height: 100,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    input: {
        width: "80%",
        height: 50,
        margin: 12,
        borderWidth: 3,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderColor: 'black',
    }
});
