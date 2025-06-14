import {ThemedText} from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {FlatList, Image, Pressable, StyleSheet, TextInput, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {useEffect, useState} from "react";
import {Agenda} from "@/types/Agendas";
import {getAgendas, getAgendasByProfessional} from "@/hooks/useAgendas";
import {makeRequest} from "@/hooks/useRequest";
import getAgendamentos from "@/hooks/useAgendamentos";
import {useCurrentUser} from "@/hooks/useUser";
import {Professional} from "@/types/Professional";


enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

function getIndexOfDayOfWeek(day: string): number {
    const daysOfWeek: { [key: string]: DayOfWeek } = {
        "domingo": DayOfWeek.Sunday,
        "segunda": DayOfWeek.Monday,
        "terça": DayOfWeek.Tuesday,
        "quarta": DayOfWeek.Wednesday,
        "quinta": DayOfWeek.Thursday,
        "sexta": DayOfWeek.Friday,
        "sábado": DayOfWeek.Saturday
    };

    return daysOfWeek[day.toLowerCase()];
}

function getDayOfWeek(index: number): string {
    const daysOfWeek: { [key: number]: string } = {
        0: "Domingo",
        1: "Segunda",
        2: "Terça",
        3: "Quarta",
        4: "Quinta",
        5: "Sexta",
        6: "Sábado"
    };

    return daysOfWeek[index];
}

function handleSearch(agendas: Array<Agenda>, professional: string){

    if (professional == "") {
        return agendas
    }

    return agendas.filter(agendas => {
        return agendas.professional_name.toLowerCase().includes(professional.toLowerCase());
    })
}

export default function Agendas() {

    const [search, setSearch] = useState("");

    const [dbAgendas, setDBAgendas] = useState<Array<Agenda>>([]);

    useEffect(() => {

        const user = useCurrentUser() as Professional;
        getAgendasByProfessional(user.id_professional).then((agendas) => {
            return setDBAgendas(agendas);
        })
    }, []);

    const [agendas, setAgendas] = useState<Array<Agenda>>();

    useEffect(() => {
        setAgendas(handleSearch(dbAgendas, search))
    }, [dbAgendas, search])

    return <ParallaxScrollView
        headerImage={<></>} headerBackgroundColor={{
        dark: "",
        light: ""
    }} headerHeight={0}>
        <View>
            <ThemedView>
                <ThemedText type={"title"} style={{margin: 10}}>Agendas</ThemedText>
            </ThemedView>
            <ThemedView
                style={styles.container}
                lightColor={"#eee"}
                darkColor={"#222"}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por profissional..."
                    value={search}
                    onChangeText={(text => {
                        setSearch(text)
                        setAgendas(handleSearch(dbAgendas, search))
                    })}
                    placeholderTextColor={"#999"}
                />
            </ThemedView>
            <FlatList
                data={agendas}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <ThemedView style={styles.card}
                                lightColor={"#eee"}
                                darkColor={"#222"}
                    >
                        <Image
                            source={item?.professional_photo ? { uri: item.professional_photo } : require('@/assets/images/medico.jpg')}
                            style={styles.image}
                        />
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Dia da semana: {getDayOfWeek(item.week_day)}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Serviço: {item.service_name}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Horario de inicio: {item.start_time}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Horario de fim: {item.final_time}</ThemedText>
                    </ThemedView>
                )}
            />


        </View>
    </ParallaxScrollView>
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        flexDirection: "column"

    },
    card: {
        flex: 1,
        height: 350,
        padding: 10,
        margin: 6,
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    text: {
        textAlign: 'center',
        flexWrap: 'wrap',
        maxWidth: '100%',
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        color: "#000",
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#007bff",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    }
});