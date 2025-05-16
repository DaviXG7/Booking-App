import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

export type NotificationType = 'success' | 'error' | 'warning';

export type NotificationMessage = {
    type: NotificationType;
    message: string;
}

interface NotificationBoxProps {
    message: string;
    type: NotificationType;
    visible: boolean;
    onClose: () => void;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ message, type, visible, onClose }) => {
    const slideAnim = new Animated.Value(100); // Posição inicial fora da tela

    useEffect(() => {
        if (visible) {
            // Anima a notificação para cima
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Fecha após 3 segundos
            const timer = setTimeout(() => {
                Animated.timing(slideAnim, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    onClose();
                });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const backgroundColor = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFC107',
    }[type];

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor, transform: [{ translateY: slideAnim }] },
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        left: Dimensions.get('window').width * 0.1,
        width: Dimensions.get('window').width * 0.8,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        zIndex: 1000,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default NotificationBox;
