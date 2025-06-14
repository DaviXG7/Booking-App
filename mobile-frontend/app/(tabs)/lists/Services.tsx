import {ThemedText} from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {FlatList, Image, Pressable, StyleSheet, TextInput, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {useEffect, useState} from "react";
import {Booking} from "@/types/Bookings";
import {getServices} from "@/hooks/useServices";
import {Service} from "@/types/Service";
import {getUsers} from "@/hooks/useUsers";
import {User} from "@/types/User";
import {useCurrentUser} from "@/hooks/useUser";
import {makeRequest} from "@/hooks/useRequest";


function handleSearch(services: Array<Service> | undefined, name: string){

    if (name == "") {
        return services
    }

    return services?.filter(service => {
        return service.name.toLowerCase().includes(name.toLowerCase());
    })
}

async function deleteService(id: string): Promise<any> {
    return await makeRequest({
        url: "http://localhost:8000/services/delete",
        method: "POST",
        params: [
            {key: "id_service", value: id, isRequired: true}
        ]
    })
}

export default function Services() {

    const [search, setSearch] = useState("");

    const [dbServices, setDBServices] = useState<Array<Service>>([]);

    useEffect(() => {
        getServices().then((services) => {
            console.log(services)
            return setDBServices(services);
        })
    }, []);

    const [services, setServices] = useState<Array<Service>>();

    useEffect(() => {
        setServices(handleSearch(dbServices, search))
    }, [dbServices, search])

    useEffect(() => {
        setServices(handleSearch([], ""))
    }, [])

    return <ParallaxScrollView
        headerImage={<></>} headerBackgroundColor={{
        dark: "",
        light: ""
    }} headerHeight={0}>
        <View>
            <ThemedView>
                <ThemedText type={"title"} style={{margin: 10}}>Serviços</ThemedText>
            </ThemedView>
            <ThemedView
                style={styles.container}
                lightColor={"#eee"}
                darkColor={"#222"}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por nome..."
                    value={search}
                    onChangeText={(text => {
                        setSearch(text)
                        setServices(handleSearch(services, search))
                    })}
                    placeholderTextColor={"#999"}
                />
            </ThemedView>
            <FlatList
                data={services}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <ThemedView style={styles.card}
                                lightColor={"#eee"}
                                darkColor={"#222"}
                    >
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Nome: {item.name}</ThemedText>
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Valor: R${item.value}</ThemedText>

                        <View style={{flexDirection: "row", gap: 10, justifyContent: "space-between", width: "100%"}}>
                            <Pressable
                                onPress={() => deleteService(item.id.toString()).then(() => {
                                    getServices().then((services) => {
                                        return setDBServices(services);
                                    })
                                })}
                                style={[styles.button, { backgroundColor: "red" }]}
                            ><ThemedText>Excluir</ThemedText></Pressable>
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