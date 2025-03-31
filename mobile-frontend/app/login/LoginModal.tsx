import {Image, Modal, Pressable, StyleSheet, TextInput} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ExternalLink} from "@/components/ExternalLink";
import {Screen} from "@/app/login/Screen";


export default function LoginModal({screenChangeRequest: setScreen}: {screenChangeRequest: ((screen: Screen) => void)}) {

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

                <ThemedText type={"subtitle"}>Logar no Bokking app</ThemedText>

                <ThemedView style={styles.modalView} lightColor={'#f7f7f7'} darkColor={'#222'}>
                    <TextInput style={styles.input} placeholder={"Digite seu email"} />
                    <TextInput style={styles.input}  placeholder={"Digite sua senha"} />
                    <Pressable style={styles.button} onPress={() => {}} >
                        <ThemedText>Entrar</ThemedText>
                    </Pressable>
                    <Pressable style={{margin: 2 }} onPress={() => {setScreen("REGISTER")}} >
                        Não tem uma conta? Registrar
                    </Pressable>
                </ThemedView>

            </ThemedView>
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
