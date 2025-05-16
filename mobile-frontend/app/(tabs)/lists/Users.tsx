import {FlatList, Image, Pressable, StyleSheet, TextInput, View} from "react-native";
import {getUsers} from "@/hooks/useUsers";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useEffect, useState} from "react";
import {User} from "@/types/User";


function handleSearch(name: string){

    const users = getUsers();

    if (name == "") {
        return users
    }

    return users.filter(user => {
        return user.name.toLowerCase().includes(name.toLowerCase());
    })
}

export default function Users() {

    const [search, setSearch] = useState("");

    const [users, setUsers] = useState<Array<User>>();

    useEffect(() => {
        setUsers(handleSearch(""))
    }, [])

    return <ParallaxScrollView
        headerImage={<></>} headerBackgroundColor={{
        dark: "",
        light: ""
    }} headerHeight={0}>
        <View>
            <ThemedView>
                <ThemedText type={"title"} style={{margin: 10}}>Usuários</ThemedText>
            </ThemedView>
            <ThemedView
                style={styles.container}
                lightColor={"#eee"}
                darkColor={"#222"}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Buscar..."
                    value={search}
                    onChangeText={(text => {
                        setSearch(text)
                        setUsers(handleSearch(search))
                    })}
                    placeholderTextColor={"#999"}
                />
            </ThemedView>
            <FlatList
                data={users}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <ThemedView style={styles.card}
                                lightColor={"#eee"}
                                darkColor={"#222"}
                    >
                        <Image
                            source={item?.image ? { uri: item.image } : require('@/assets/images/medico.jpg')}
                            style={styles.image}
                        />
                        <ThemedText numberOfLines={2} ellipsizeMode="tail">Nome: {item.name}</ThemedText>
                        <ThemedText numberOfLines={3} ellipsizeMode="tail">Email: {item.email}</ThemedText>

                        <ThemedText>Cargo: {item.role}</ThemedText>

                        <View style={styles.buttons}>
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
        height: 400,
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
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center"
    }
});