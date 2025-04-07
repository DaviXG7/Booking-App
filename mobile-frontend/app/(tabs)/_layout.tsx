import { Tabs } from 'expo-router';
import React, {useEffect, useState} from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginModal from "@/app/login/LoginModal";
import { Screen } from "../login/Screen";
import {isLogged} from "@/hooks/useUser";
import RegisterModal from "@/app/login/RegisterModal";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [showLogin, setScreen] = useState<Screen | undefined>("REGISTER");

    useEffect(() => {
        if (isLogged()) {
            setScreen(undefined)
        }
    }, []);


  return (
      <>
          {showLogin === "LOGIN" && <LoginModal screenChangeRequest={screen => setScreen(screen)} />}
          {showLogin === "REGISTER" && <RegisterModal screenChangeRequest={screen => setScreen(screen)} />}

          <Tabs
              screenOptions={{
                  tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                  headerShown: false,
                  tabBarButton: HapticTab,
                  tabBarBackground: TabBarBackground,
                  tabBarStyle: Platform.select({
                      ios: {
                          // Use a transparent background on iOS to show the blur effect
                          position: 'absolute',
                      },
                      default: {},
                  }),
              }}>
              <Tabs.Screen
                  name="index"
                  options={{
                      title: 'Início',
                      tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                  }}
              />
              <Tabs.Screen
                  name="lists/Users"
                  options={{
                      title: 'Usuários',
                      tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                  }}
              />
              <Tabs.Screen
                  name="lists/Agendas"
                  options={{
                      title: 'Agendas',
                      tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                  }}
              />
              <Tabs.Screen
                  name="lists/Bookings"
                  options={{
                      title: 'Agendamentos',
                      tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                  }}
              />
              <Tabs.Screen
                  name="lists/YourAgendas"
                  options={{
                      title: 'Suas agendas',
                      tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                  }}
              />
              <Tabs.Screen
                  name="EditUser"
                  options={{
                      title: 'Usuário',
                      tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                  }}
              />
          </Tabs>
      </>
  );
}
