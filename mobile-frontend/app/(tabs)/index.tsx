import {Image, StyleSheet, Platform, ScrollView, View, Pressable, FlatList} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CreateThings from "@/app/defaults/CreateThings";
import {User} from "@/types/User";
import {useCurrentUser} from "@/hooks/useUser";
import getAgendamentos, {getAgendamentosByUser} from "@/hooks/useAgendamentos";

const user: User | undefined = useCurrentUser()

export default function HomeScreen() {

    const agendamentos = getAgendamentosByUser(user)

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

            <ThemedText type="subtitle" style={{textAlign: "center"}}>Agendamentos: </ThemedText>
            <CreateThings></CreateThings>

            {agendamentos.length == 0 && (
                <ThemedText type={"defaultSemiBold"} style={{textAlign: "center"}}>Você não possui agendamentos</ThemedText>
            )}
            <FlatList
                data={agendamentos}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <ThemedView style={styles.bookingContainer} lightColor={'#f7f7f7'} darkColor={'#222'}>
                        <ThemedView style={{alignItems: 'center', backgroundColor: "none"}}>
                            <Image
                                source={item?.agenda.professional.image ? { uri: item.agenda.professional.image } : require('@/assets/images/medico.jpg')}
                                style={styles.medicoLogo}
                            />
                        </ThemedView>

                        <ThemedText>Data e hora: {item.date_time}</ThemedText>
                        <ThemedText>Profissional: {item.agenda.professional.name}</ThemedText>
                        <ThemedText>Serviço: {item.agenda.service.name}</ThemedText>
                    </ThemedView>
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
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
