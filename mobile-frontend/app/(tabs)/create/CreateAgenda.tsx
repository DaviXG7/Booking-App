import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import React, {useEffect, useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import {Pressable, StyleSheet, TextInput} from "react-native";
import {getCustomers, getProfessionals} from "@/hooks/useUsers";
import {RequestForm} from "@/types/Form";
import {makeRequest} from "@/hooks/useRequest";
import NotificationBox, {NotificationMessage} from "@/app/defaults/NotificationBox";
import {getServices} from "@/hooks/useServices";
import {getWeekDayValues} from "@/types/Days";
import {User} from "@/types/User";
import {Professional} from "@/types/Professional";
import {Service} from "@/types/Service";

export default function() {

    const [professionals, setUsers] = useState<Array<Professional>>([]);

    useEffect(() => {
        getProfessionals().then((users) => {
            return setUsers(users);
        })
    }, []);

    const [services, setServices] = useState<Array<Service>>([]);

    useEffect(() => {
        getServices().then((services) => {
            return setServices(services);
        })
    }, []);

    const days = getWeekDayValues();


    const [message, setMessage] = useState<NotificationMessage | null>(null)

    const [formData, setFormData] = useState<RequestForm>({
        url: "http://127.0.0.1:8000/agenda/create/",
        method: "POST",
        params: [
            {key: "id_professional", value: null, isRequired: true},
            {key: "id_service", value: null, isRequired: true},
            {key: "week_day", value: null, isRequired: true},
            {key: "start_time", value: null, isRequired: true},
            {key: "final_time", value: null, isRequired: true}
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
                    message: "Profissional registrado com sucesso!",
                    type: "success"
                });
                return
            }
            setMessage({
                message: "Erro ao registrar profissional",
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
                <ThemedText type={"title"} style={{margin: 5, textAlign: "center"}}>Cadastrar agenda</ThemedText>

                <Dropdown
                    style={styles.input}
                    data={professionals}
                    maxHeight={300}
                    placeholderStyle={{padding: 20}}
                    labelField="name"
                    valueField="id"
                    placeholder={"Selecione o prof.. *"}
                    value={formData.params.find(p => p.key === "id_professional")?.value}
                    onChange={item => handleChange("id_professional", item.id)}
                />

                <Dropdown
                    style={styles.input}
                    data={services}
                    maxHeight={300}
                    placeholderStyle={{padding: 20}}
                    labelField="name"
                    valueField="id"
                    placeholder={"Selecione o serviço*"}
                    value={formData.params.find(p => p.key === "id_service")?.value}
                    onChange={item => handleChange("id_service", item.id)}
                />

                <Dropdown
                    style={styles.input}
                    data={days}
                    maxHeight={300}
                    placeholderStyle={{padding: 20}}
                    labelField="name"
                    valueField="id"
                    placeholder={"Selecione o dia*"}
                    value={formData.params.find(p => p.key === "week_day")?.value}
                    onChange={item => handleChange("week_day", item.id)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Hora inicial*"
                    keyboardType="numeric"
                    onChangeText={(i) => handleChange("start_time", i)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hora final*"
                    keyboardType="numeric"
                    onChangeText={(i) => handleChange("final_time", i)}
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
