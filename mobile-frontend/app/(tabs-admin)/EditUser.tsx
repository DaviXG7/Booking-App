import {Image, TextInput} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {User} from "@/types/User";
import {useCurrentUser} from "@/hooks/useUser";
import React from 'react';
import {HelloWave} from "@/components/HelloWave";
import {ThemedText} from "@/components/ThemedText";

const user: User | undefined = useCurrentUser()

export default function TabTwoScreen() {
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
            <TextInput placeholder={"Edite seu nome"} />
            <TextInput placeholder={"Envie uma imagem"} />
        </Collapsible>

    </ParallaxScrollView>
  );
}
