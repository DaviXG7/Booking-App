import {ThemedText} from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {FlatList, Image, Pressable, StyleSheet, TextInput, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {useEffect, useState} from "react";
import getAgendamentos from "@/hooks/useAgendamentos";
import {Booking} from "@/types/Bookings";


function handleSearch(datetime: string){

    const bookings = getAgendamentos();

    if (datetime == "") {
        return bookings
    }

    return bookings.filter(booking => {
        return booking.date_time.toLowerCase().includes(datetime.toLowerCase());
    })
}

export default function Bookings() {

    const [search, setSearch] = useState("");

    const [bookings, setBookings] = useState<Array<Booking>>();

    useEffect(() => {
        setBookings(handleSearch(""))
    }, [])

    return <ParallaxScrollView
        headerImage={<></>} headerBackgroundColor={{
        dark: "",
        light: ""
    }} headerHeight={0}>
        <View>
            <ThemedView>
                <ThemedText type={"title"} style={{margin: 10}}>Agendamentos</ThemedText>
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
                        setBookings(handleSearch(search))
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
                            source={item?.agenda.professional.image ? { uri: item.agenda.professional.image } : require('@/assets/images/medico.jpg')}
                            style={styles.image}
                        />
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Dia: {item.date_time}</ThemedText>
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Profissional: {item.agenda.professional.name}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Requisitado por: {item.customer.name}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Serviço: {item.agenda.service.name}</ThemedText>

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