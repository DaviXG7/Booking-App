import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import React, {useEffect, useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import {Pressable, StyleSheet, TextInput} from "react-native";
import NotificationBox, {NotificationMessage} from "@/app/defaults/NotificationBox";
import {Service} from "@/types/Service";
import {AvailableAgenda} from "@/types/Agendas";
import {getServices} from "@/hooks/useServices";
import {makeRequest} from "@/hooks/useRequest";
import {useCurrentUser} from "@/hooks/useUser";

export default function() {
    //lists
    const [services, setServices] = useState<Array<Service>>([])
    const [agendas, setAgendas] = useState<Array<AvailableAgenda > | undefined>(undefined)

    //var
    const [service, setService] = useState<Service>()
    const [date, setDate] = useState<string>()
    const [agenda, setAgenda] = useState<AvailableAgenda>()


    //setVars

    useEffect(() => {
        getServices().then(setServices)
    }, []);

    useEffect(() => {

        if (!service || !date || date.length !== 10) return;

        makeRequest({
            url: "http://127.0.0.1:8000/agenda/filter/",
            method: "GET",
            params: [
                {
                    key: "id_service",
                    value: service.id + "",
                    isRequired: true
                },
                {
                    key: "date",
                    value: date,
                    isRequired: true
                }
            ]
        }).then(resp => resp.json())
            .then(setAgendas)

    }, [service, date]);

    const [message, setMessage] = useState<NotificationMessage | null>(null)

    const handleSubmit = () => {
        makeRequest(
            {
                url: "http://127.0.0.1:8000/booking/create/",
                method: "POST",
                params: [
                    {
                        key: "id_agenda",
                        value: agenda?.id_agenda + "",
                        isRequired: true
                    },
                    {
                        key: "id_customer",
                        value: useCurrentUser()?.id + "",
                        isRequired: true
                    },
                    {
                        key: "date",
                        value: agenda?.date,
                        isRequired: true
                    },
                    {
                        key: "time",
                        value: agenda?.horary + "",
                        isRequired: true
                    }
                ]
            }
        ).then(async r => {
            if (r.status === 200) {
                setMessage({
                    message: "Reserva feita com sucesso!",
                    type: "success"
                });
                setAgendas(undefined)
                setService(undefined)
                setDate("")
                return
            }

            const data = await r.json();

            setMessage({
                message: "Erro ao fazer a reserva: " + data.error ,
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
                <ThemedText type={"title"} style={{margin: 5, textAlign: "center"}}>Fazer uma reserva</ThemedText>

                <Dropdown
                    style={styles.input}
                    data={services}
                    maxHeight={300}
                    placeholderStyle={{padding: 20}}
                    labelField="name"
                    valueField="id"
                    placeholder={"Selecione o serviço*"}
                    value={service}
                    onChange={item => setService(item)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Digite a data da reserva"
                    onChangeText={(i) => setDate(i)}
                />

                {agendas && (
                    <Dropdown
                        style={styles.input}
                        data={agendas}
                        maxHeight={300}
                        placeholderStyle={{padding: 20}}
                        labelField="professional_and_hour"
                        valueField="id"
                        placeholder={"Selecione o horário*"}
                        value={agenda}
                        onChange={item => setAgenda(item)}
                    />
                )}

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <ThemedText lightColor="#FFF" darkColor="#000">Reservar R${service?.value ?? "0,00"}</ThemedText>
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
        width: 150,
        height: 50,
        backgroundColor: "#0000ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        marginTop: 10,
    }
});