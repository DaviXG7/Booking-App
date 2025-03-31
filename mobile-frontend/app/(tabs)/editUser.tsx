import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import {User} from "@/types/User";
import {useCurrentUser} from "@/hooks/useUser";
import React from 'react';
import {HelloWave} from "@/components/HelloWave";

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
        </Collapsible>

    </ParallaxScrollView>
  );
}
