import {ThemedText} from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {FlatList, Image, Pressable, StyleSheet, TextInput, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {useEffect, useState} from "react";
import getAgendas from "@/hooks/useAgendas";
import {Agenda} from "@/types/Agendas";


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

function handleSearch(datetime: string){

    const agendas = getAgendas();

    if (datetime == "") {
        return agendas
    }

    return agendas.filter(agenda => {
        return agenda.week_day === getIndexOfDayOfWeek(datetime.toLowerCase());
    })
}

export default function Agendas() {

    const [search, setSearch] = useState("");

    const [agendas, setAgendas] = useState<Array<Agenda>>();

    useEffect(() => {
        setAgendas(handleSearch(""))
    }, [])

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
                    placeholder="Buscar por dia..."
                    value={search}
                    onChangeText={(text => {
                        setSearch(text)
                        setAgendas(handleSearch(search))
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
                            source={item?.service.professional.image ? { uri: item.service.professional.image } : require('@/assets/images/medico.jpg')}
                            style={styles.image}
                        />
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Dia da semana: {getDayOfWeek(item.week_day)}</ThemedText>
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Profissional: {item.service.professional.name}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Serviço: {item.service.name}</ThemedText>

                        <View style={{flexDirection: "row", gap: 10, justifyContent: "space-between", width: "100%"}}>
                            <Pressable style={[styles.button, {backgroundColor: "green"}]}><ThemedText>Editar</ThemedText></Pressable>
                            <Pressable style={[styles.button, {backgroundColor: "red"}]}><ThemedText>Excluir</ThemedText></Pressable>
                        </View>
                    </ThemedView>
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />


        </View>
    </ParallaxScrollView>
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
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