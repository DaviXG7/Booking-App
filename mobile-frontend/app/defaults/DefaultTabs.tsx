import {ThemedView} from "@/components/ThemedView";
import {useCurrentUser} from "@/hooks/useUser";
import {User} from "@/types/User";
import {Pressable, StyleSheet} from "react-native";
import {Href, Link, RelativePathString} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {calculateViewScale} from "react-native-gesture-handler/lib/typescript/web/utils";
import {useState} from "react";

function getItem(selected: string, link: Href, name: String, press: () => void ) {
    const isSelected = selected === name
    return <Link href={link} style={styles.links}
        onPress={press}
    >
        <ThemedText
            darkColor={"#FFF"}
            lightColor={"#000"}
            style={isSelected ? {textDecorationLine: "underline"} : undefined}
        >
            {name}
        </ThemedText>
    </Link>
}

export default function DefaultTabs() {

    const user = useCurrentUser();

    const [selected, setSelected] = useState("Início");

    const list = []

    list.push(
        getItem(selected, "/", "Início", () => setSelected("Início"))
    )

    if (user?.role == "PROFESSIONAL") {
        list.push(
            getItem(selected, "/lists/YourAgendas", "Suas agendas", () => setSelected("Suas agendas"))
        )
    }

    if (user?.role == "ADMIN") {
        list.push(
            getItem(selected, "/lists/Users", "Usuários", () => setSelected("Usuários"))

        )
        list.push(
            getItem(selected, "/lists/Bookings", "Reservas", () => setSelected("Reservas"))

        )
        list.push(
            getItem(selected, "/lists/Agendas", "Agendas", () => setSelected("Agendas"))

        )
    }

    list.push(
        getItem(selected, "/EditUser", "Usuário", () => setSelected("Usuário"))

    )

    return <ThemedView style={styles.tabs}
    lightColor={"#FFF"}
    darkColor={"#000"}
    >
        {list}
    </ThemedView>
}

const styles = StyleSheet.create({
    tabs: {
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 1,
    },
    links: {
        width: 80,
        height: 30,
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center"
    }
})