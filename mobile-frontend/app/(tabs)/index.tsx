import {Image, StyleSheet, Platform, ScrollView} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CreateThings from "@/app/CreateThings";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
        headerImage={<></>}
        headerBackgroundColor={{
          dark: '',
          light: ''
      }}
        headerHeight={0}
>
        <CreateThings></CreateThings>
      <ThemedView style={styles.titleContainer}>
          <Image
              source={require('@/assets/images/booking.png')}
              style={styles.reactLogo}
          />
          <ThemedText type="title">Booking App</ThemedText>
      </ThemedView>

        <ThemedView>

            <ThemedText type="subtitle">Agendamentos: </ThemedText>

            <ThemedView style={styles.bookingContainer} lightColor={'#f7f7f7'} darkColor={'#222'}>
                <ThemedView style={{alignItems: 'center', backgroundColor: "none"}}>
                    <Image
                        source={require('@/assets/images/medico.jpg')}
                        style={styles.medicoLogo}
                    />
                </ThemedView>

                <ThemedText>Data e hora: </ThemedText>
                <ThemedText>Profissional: </ThemedText>
                <ThemedText>Serviço: </ThemedText>
            </ThemedView>

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
