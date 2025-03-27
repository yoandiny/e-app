import 'react-native-gesture-handler'; // Doit être au tout début
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from 'expo-constants';
import Navbar from './screens/Navbar';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { checkForUpdates } from './screens/components/update';


// Gérer les notifications en arrière-plan
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,  // 👈 Permet d'afficher la notification
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permission refusée pour les notifications !');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Token Expo :", token);
  } else {
    console.log('Les notifications push ne fonctionnent pas sur un émulateur.');
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [userId, setUserId] = useState('');  // Utilisateur connecté (ID)
  const currentVersion = `v${Constants.expoConfig.version}`;

  const notificationListener = useRef();
  const responseListener = useRef();

  // Fonction pour récupérer l'ID utilisateur depuis AsyncStorage
  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value) {
        setUserId(value);  // Stocker l'ID utilisateur dans le state
      }
    } catch (error) {
      console.error('Erreur de récupération de l\'ID utilisateur:', error);
    }
  };





  


  useEffect(() => {
  
    checkForUpdates(currentVersion);
    getId();

    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);

        if (userId) {
          axios.post('https://tall-debonair-danger.glitch.me/store-token', {
            token,
            userId, 
          })
          .then(response => {
            console.log('Token enregistré avec succès:', response.data);
          })
          .catch(error => {
            console.error('Erreur lors de l\'enregistrement du token:', error);
          });
        }
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification reçue :", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification cliquée :", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [userId]);

  return (
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
  );
}
