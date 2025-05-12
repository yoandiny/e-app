import React, { useState } from 'react';
import 'react-native-reanimated';
import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StyleSheet,Image, TouchableOpacity  } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './profile';
import Login from './login';
import Register from './register';
import ClubInfo from './clubInfo';
import AdminDash from './adminDashboard';
import Fees from './fees'
import FactionChoose from './profile_components/factionChoose';
import YourFaction from './yourFaction';


const Navbar = () => {

    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();

    

   

 




    return(
  
      <Drawer.Navigator screenOptions={{drawerStyle: style.sidebar, headerStyle: style.Nav, headerTitle: ()=> <TouchableOpacity onPress={()=>{navigation.navigate('Acceuil');}}>
        <Image source={require('../assets/logo.png')} style={style.logo}/>
      </TouchableOpacity>, headerTitleAlign: 'center'} } initialRouteName="Connexion">
        <Drawer.Screen name="Acceuil" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name='Vos Factions' component={YourFaction}/>
        <Drawer.Screen name='Paiement Cotisation' component={Fees} />
        <Drawer.Screen name='Inscription' component={Register} options={{drawerItemStyle:style.invisibleMenu}} />
        <Drawer.Screen name='Connexion' component={Login} options={{drawerItemStyle:style.invisibleMenu}} />
        <Drawer.Screen name='adminDashboard' component={AdminDash} options={{drawerItemStyle:style.invisibleMenu}} />
        <Drawer.Screen name='factionChoose' component={FactionChoose} options={{drawerItemStyle: style.invisibleMenu}}/>
        
        
      </Drawer.Navigator>




    );
}

const style = StyleSheet.create({
  sidebar: {
    backgroundColor: '#F1B708',
    color: 'black'
  },
  Nav:{
    backgroundColor: '#F1B708',
  },
  invisibleMenu:{
    display: 'none'
  },
  logo:{
    width: 60,
    height: 60
  }
});

export default Navbar;