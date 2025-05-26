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
import {Agenda} from "@/types/Agendas";
import {Service} from "@/types/Service";

export default function() {

    const services = getServices();

    const [service, setService] = useState<Service | null>(null)

    const [message, setMessage] = useState<NotificationMessage | null>(null)

    const [price, setPrice] = useState<number>(0)
    const [agendas, setAgendas] = useState<Array<Agenda>>([])

    const [formData, setFormData] = useState<RequestForm>({
        url: "",
        method: "POST",
        params: [
            {key: "id_agenda", value: null, isRequired: true},
            {key: "id_customer", value: "a", isRequired: true},
            {key: "date_time", value: null, isRequired: true},
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
                <ThemedText type={"title"} style={{margin: 5, textAlign: "center"}}>Fazer uma reserva:</ThemedText>

                <Dropdown
                    style={styles.input}
                    data={services}
                    maxHeight={300}
                    placeholderStyle={{padding: 20}}
                    labelField="name"
                    valueField="id"
                    placeholder={"Selecione o serviço.. *"}
                    value={service}
                    onChange={item => setService(services.filter(s => s.id === item.id)[0])}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dia e hora"
                    keyboardType="numeric"
                    onChangeText={(i) => handleChange("date_time", i)}
                />
                {service !== null && formData.params.find(p => p.key = "date_time") !== null && (
                    <Dropdown
                        style={styles.input}
                        data={agendas}
                        maxHeight={300}
                        placeholderStyle={{padding: 20}}
                        labelField="name"
                        valueField="id"
                        placeholder={"Selecione a agenda.. *"}
                        value={service}
                        onChange={item => handleChange("id_agenda", item.id)}
                    />
                )}

                <ThemedText style={{fontSize: 14}} lightColor="#FFF" darkColor="#000">Preço: R${price}</ThemedText>

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <ThemedText lightColor="#FFF" darkColor="#000">Pagar</ThemedText>
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
