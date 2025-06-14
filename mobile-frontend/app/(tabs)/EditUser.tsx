import {Image, Pressable, StyleSheet, TextInput} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {User} from "@/types/User";
import {isLogged, login, useCurrentUser} from "@/hooks/useUser";
import React, {useCallback, useEffect, useState} from 'react';
import {HelloWave} from "@/components/HelloWave";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useFocusEffect} from "expo-router";
import {RequestForm} from "@/types/Form";
import NotificationBox, {NotificationMessage} from "@/app/defaults/NotificationBox";
import {makeRequest} from "@/hooks/useRequest";
import {Professional} from "@/types/Professional";

export default function TabTwoScreen() {

    const [user, setUser] = useState<User | undefined>(undefined)
    const [professional, setProfessional] = useState<Professional | undefined>(undefined)

    const currentUser = useCurrentUser();

    useFocusEffect(
        useCallback(() => {
            setUser(currentUser);
            setProfessional(currentUser?.role === "PROFESSIONAL" ? currentUser as Professional : undefined)
            setFormData({
                url: "http://127.0.0.1:8000/user/edit",
                method: "POST",
                params: [
                    {key: "id_user", value: currentUser?.id.toString(), isRequired: true},
                    {key: "name", value: null, isRequired: false},
                    {key: "image", value: null, isRequired: false}
                ]
            })
        }, [currentUser])
    );

    const [formData, setFormData] = useState<RequestForm>({
        url: "http://127.0.0.1:8000/user/edit/no-id",
        method: "POST",
        params: [
            {key: "name", value: null, isRequired: false},
            {key: "image", value: null, isRequired: false}
        ]
    });

    const [message, setMessage] = useState<NotificationMessage | null>(null)


    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            params: prev.params.map(param =>
                param.key === key ? { ...param, value } : param
            )
        }));
    };

    const handleSubmit = () => {
        makeRequest(formData).then(async r => {
            console.log(r)
            if (r.status === 200) {
                setMessage({
                    message: "Usuário editado com sucesso!",
                    type: "success"
                });
                r.json().then(user => {
                    console.log(user)
                    login(user as User | Professional)
                    if (isLogged()) setUser(useCurrentUser())
                })

                return;
            }
            const data = await r.json();
            console.log(data)
            setMessage({
                message: "Erro ao editar usuário: " + data.message,
                type: "error"
            });

        })
    };

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

        {professional != undefined && (
            <Collapsible title={"Informações de profissional"}>
                <ThemedText>
                    Cargo: {professional.professional_role}
                </ThemedText>
                <ThemedText>
                    Pix: {professional.pix}
                </ThemedText>
                <ThemedText>
                    Nome do banco: {professional.bank_name}
                </ThemedText>
                <ThemedText>
                    Agência: {professional.agency}
                </ThemedText>
                <ThemedText>
                    Conta: {professional.account_number}
                </ThemedText>
            </Collapsible>
        )}

        <Collapsible title={"Editar informações"}>
            <ThemedView style={styles.edit}>
                <ThemedText type={"title"} lightColor={"#FFF"} darkColor={"#000"}>
                    Editar
                </ThemedText>
                <TextInput style={styles.formInput} placeholder={"Edite seu nome"} onChangeText={t => handleChange("name", t)} />
                <TextInput style={styles.formInput} placeholder={"Digite a url de uma imagem"} onChangeText={t => handleChange("image", t)} />
                <Pressable style={styles.button} ><ThemedText  lightColor={"#FFF"} darkColor={"#000"} onPress={handleSubmit}>Enviar</ThemedText></Pressable>
            </ThemedView>
        </Collapsible>

        <NotificationBox
            message={message?.message ?? ""}
            type={message?.type ?? "success"}
            visible={message != null}
            onClose={() => setMessage(null)}
        />

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
