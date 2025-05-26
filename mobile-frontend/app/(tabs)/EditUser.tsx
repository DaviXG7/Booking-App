import {Image, Pressable, StyleSheet, TextInput} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {User} from "@/types/User";
import {useCurrentUser} from "@/hooks/useUser";
import React, {useCallback, useEffect, useState} from 'react';
import {HelloWave} from "@/components/HelloWave";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useFocusEffect} from "expo-router";

export default function TabTwoScreen() {

    const [user, setUser] = useState<User | undefined>(undefined)

    const currentUser = useCurrentUser();

    useFocusEffect(
        useCallback(() => {
            setUser(currentUser);
        }, [currentUser])
    );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerHeight={150}
      headerImage={
          <Image
              source={user?.image ? { uri: user.image } : require('@/assets/images/medico.jpg')}
              style={{width: 100, height: 100, borderRadius: 50}}
          />
      }>
        <ThemedText type={"title"}>
            {"Olá, " + user?.name} <HelloWave></HelloWave>
        </ThemedText>

        <ThemedText type={"subtitle"}>
            Informações do usuário:
        </ThemedText>

        <ThemedText>
            Email: {user?.email}
        </ThemedText>
        <ThemedText>
            Cargo: {user?.role}
        </ThemedText>

        <Collapsible title={"Editar informações"}>
            <ThemedView style={styles.edit}>
                <ThemedText type={"title"} lightColor={"#FFF"} darkColor={"#000"}>
                    Editar
                </ThemedText>
                <TextInput style={styles.formInput} placeholder={"Edite seu nome"} />
                <TextInput style={styles.formInput} placeholder={"Envie uma imagem"} />
                <Pressable style={styles.button} ><ThemedText  lightColor={"#FFF"} darkColor={"#000"}>Enviar</ThemedText></Pressable>
            </ThemedView>
        </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create(
    {
        edit: {
            width: "100%",
            backgroundColor: "gray",
            display: "flex",
            alignItems: "center",
            padding: 20,
            borderRadius: 10
        },
        formInput: {
            height: 40,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 3,
            width: "85%",
            margin: 15
        },
        button: {
            width: 100,
            height: 50,
            backgroundColor: "#010188",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30
        }
    }
)
