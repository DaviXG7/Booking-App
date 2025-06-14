import {Image, StyleSheet, Platform, ScrollView, View, Pressable, FlatList} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CreateThings from "@/app/defaults/CreateThings";
import {User} from "@/types/User";
import {useCurrentUser} from "@/hooks/useUser";
import getAgendamentos, {getAgendamentosByUser} from "@/hooks/useAgendamentos";
import {useEffect, useState} from "react";
import {Booking} from "@/types/Bookings";

export default function HomeScreen() {


    const [bookings, setBookings] = useState<Array<Booking>>([])

    const [user, setUser] = useState<User>();


    useEffect(() => {
        setUser(useCurrentUser());
    }, []);

    useEffect(() => {
        getAgendamentosByUser(user).then(setBookings);
    }, [user]);


    return (
    <ParallaxScrollView
        headerImage={<></>}
        headerBackgroundColor={{
          dark: '',
          light: ''
        }}
        headerHeight={0}
    >
      <ThemedView style={styles.titleContainer}>
          <Image
              source={require('@/assets/images/booking.png')}
              style={styles.reactLogo}
          />
          <ThemedText type="title">Booking App</ThemedText>
      </ThemedView>

        <ThemedView style={{display: "flex", alignItems: "center"}}>

            <ThemedText type="subtitle" style={{textAlign: "center"}}>Reservas: </ThemedText>
            <CreateThings></CreateThings>
            <Pressable style={styles.recharge} onPress={() => {
                console.log("zdadsadasdadad")
                getAgendamentosByUser(user).then(setBookings)
            }}><ThemedText>Recarregar...</ThemedText></Pressable>

            {bookings.length == 0 && (
                <ThemedText type={"defaultSemiBold"} style={{textAlign: "center"}}>Você não possui reservas agendadas</ThemedText>
            )}
            <FlatList
                data={bookings}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <ThemedView style={styles.bookingContainer} lightColor={'#f7f7f7'} darkColor={'#222'}>
                        <ThemedView style={{alignItems: 'center', backgroundColor: "none"}}>
                            <Image
                                source={item?.professional_profile ? { uri: item.professional_profile } : require('@/assets/images/medico.jpg')}
                                style={styles.medicoLogo}
                            />
                        </ThemedView>

                        <ThemedText>Data e hora: {item.date_time.replaceAll("-", "/")}</ThemedText>
                        <ThemedText>Profissional: {item.professional_name}</ThemedText>
                        <ThemedText>Serviço: {item.service_name}</ThemedText>
                    </ThemedView>
                )}
            />

        </ThemedView>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
      alignItems: 'center',
      gap: 15,
      margin: 15,
      textAlign: "center"
  },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    recharge: {
      height: 50,
        width: '50%',
        backgroundColor: 'grey',
        borderStyle: 'solid',
        borderColor: '#d2d2d2',
        borderRadius: 5,
        borderWidth: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: 100,
      height: 100
  },
    medicoLogo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    bookingContainer: {
        gap: 8,
        marginBottom: 8,
        padding: 8,
        margin: 8,
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    }
});
