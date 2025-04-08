import {FlatList, Image, StyleSheet, View} from "react-native";
import {getUsers} from "@/hooks/useUsers";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";

export default function Users() {

    return <ParallaxScrollView
        headerImage={<></>} headerBackgroundColor={{
        dark: "",
        light: ""
    }} headerHeight={0}>
        <View>
            <ThemedView>
                <ThemedText type={"title"}>Header</ThemedText>
            </ThemedView>
            <FlatList
                style={{flexDirection: "row"}}
            data={getUsers()}
            keyExtractor={(user) => user.id.toString()}
            renderItem={({ item }) => (
                <ThemedView style={styles.card}>
                    <Image
                        source={item?.image ? { uri: item.image } : require('@/assets/images/medico.jpg')}
                        style={styles.image}
                    />
                    <ThemedText>Nome: {item.name}</ThemedText>
                    <ThemedText>Email: {item.email}</ThemedText>
                    <ThemedText>Cargo: {item.role}</ThemedText>
                </ThemedView>
            )}

            />

        </View>
    </ParallaxScrollView>
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 350,
        padding: 2,
        backgroundColor: "red",
        margin: 3,
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: 100,
        height: 100
    }
})