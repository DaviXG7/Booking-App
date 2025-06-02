import {Image, Modal, Pressable, StyleSheet, TextInput} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Screen} from "@/app/login/Screen";
import {useState} from "react";
import {RequestForm} from "@/types/Form";
import NotificationBox, {NotificationMessage} from "@/app/defaults/NotificationBox";
import {makeRequest} from "@/hooks/useRequest";
import {isLogged, login} from "@/hooks/useUser";
import {User} from "@/types/User";
import {useNavigation} from "expo-router";
import {Professional} from "@/types/Professional";

export default function LoginModal({screenChangeRequest: setScreen}: {screenChangeRequest: ((screen: Screen | undefined) => void)}) {

    const navigation = useNavigation();

    const [formData, setFormData] = useState<RequestForm>({
        url: "http://127.0.0.1:8000/user/login",
        method: "POST",
        params: [
            {key: "email", value: null, isRequired: true},
            {key: "password", value: null, isRequired: true}
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
            if (r.status === 200) {
                setMessage({
                    message: "Usuário logado com sucesso!",
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
            console.log(data)
            setMessage({
                message: "Erro ao login usuário: " + data.message,
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

                <ThemedText type={"subtitle"}>Logar no Booking app</ThemedText>

                <ThemedView style={styles.modalView} lightColor={'#f7f7f7'} darkColor={'#222'}>
                    <TextInput style={styles.input} placeholder={"Digite seu email"} onChangeText={(text) => handleChange("email", text)} />
                    <TextInput secureTextEntry={true} style={styles.input}  placeholder={"Digite sua senha"} onChangeText={(text) => handleChange("password", text)} />
                    <Pressable style={styles.button} onPress={handleSubmit} >
                        <ThemedText>Entrar</ThemedText>
                    </Pressable>
                    <Pressable style={{ margin: 2 }} onPress={() => {setScreen("REGISTER")}} >
                        <ThemedText>Não tem uma conta? Cadastrar</ThemedText>
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
