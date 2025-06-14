import {ThemedText} from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {FlatList, Image, Pressable, StyleSheet, TextInput, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {useEffect, useState} from "react";
import getAgendamentos, {getAgendamentosByUser} from "@/hooks/useAgendamentos";
import {Booking} from "@/types/Bookings";
import {Agenda} from "@/types/Agendas";
import {getAgendas} from "@/hooks/useAgendas";
import {makeRequest} from "@/hooks/useRequest";
import {getServices} from "@/hooks/useServices";


function handleSearch(bookings: Array<Booking>, professional: string){

    if (professional == "") {
        return bookings
    }

    return bookings.filter(booking => {
        return booking.professional_name.toLowerCase().includes(professional.toLowerCase());
    })
}

async function deleteBooking(id: string): Promise<any> {
    return await makeRequest({
        url: "http://localhost:8000/booking/delete",
        method: "POST",
        params: [
            {key: "id_booking", value: id, isRequired: true}
        ]
    })
}

export default function Bookings() {

    const [search, setSearch] = useState("");

    const [dbBookings, setDBBookings] = useState<Array<Booking>>([]);

    useEffect(() => {
        getAgendamentos().then(setDBBookings)
    }, []);

    const [bookings, setBookings] = useState<Array<Booking>>();

    useEffect(() => {
        setBookings(handleSearch(dbBookings, search))
    }, [dbBookings, search])

    return <ParallaxScrollView
        headerImage={<></>} headerBackgroundColor={{
        dark: "",
        light: ""
    }} headerHeight={0}>
        <View>
            <ThemedView>
                <ThemedText type={"title"} style={{margin: 10}}>Reservas</ThemedText>
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
                        setBookings(handleSearch(dbBookings, search))
                    })}
                    placeholderTextColor={"#999"}
                />
            </ThemedView>
            <FlatList
                data={bookings}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <ThemedView style={styles.card}
                                lightColor={"#eee"}
                                darkColor={"#222"}
                    >
                        <Image
                            source={item?.professional_profile ? { uri: item.professional_profile} : require('@/assets/images/medico.jpg')}
                            style={styles.image}
                        />
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Dia: {item.date_time}</ThemedText>
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Profissional: {item.professional_name}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Requisitado por: {item.user_name}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Serviço: {item.service_name}</ThemedText>

                        <View style={{flexDirection: "row", gap: 10, justifyContent: "space-between", width: "100%"}}>
                            <Pressable
                                onPress={() => deleteBooking(item.id.toString()).then(() => {
                                    getAgendamentos().then((bookings) => {
                                        return setDBBookings(bookings);
                                    })
                                })}
                                style={[styles.button, { backgroundColor: "red" }]}
                            ><ThemedText>Excluir</ThemedText></Pressable>
                        </View>
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