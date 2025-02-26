import 'react-native-gesture-handler'; // Doit être au tout début
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navbar from './screens/Navbar';




export default function App() {

  
  return (
    <NavigationContainer>

      <Navbar/>
    </NavigationContainer>
  );
}
