import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const YourFaction= ()=>   {

    const [myFactions, setMyFactions] = useState([]);
    const [studentId, setStudentId] = useState('');

    const getId = async () => {
      try {
          const value = await AsyncStorage.getItem('id');
          setStudentId(value);
          
      } catch (error) {
          
      }
  }


    const getMyFactions = async () => {
      try {
        const res = await axios.get(`https://tall-debonair-danger.glitch.me/getMyFactions?studentId=${studentId}`);
        setMyFactions(res.data);
      } catch (error) {
        
      }
    };

    
  
    useFocusEffect(()=>{
      getId();
      getMyFactions();
  
    })
    return (
      
      <View style={style.main}>
        
        <FlatList
            data={myFactions}
            keyExtractor={(item) => item.game_id.toString()}
            renderItem={({ item }) => (
                <View style={style.factionCard}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: item.icon_url }} style={style.factionIcon} />
                        <Text style={style.factionName}>{item.game_name || 'Unknown'}</Text>
                    </View>
                    <Text style={style.factionCaptain}>Capitaine : {item.captain_name || 'Unknown'}</Text>
        
                    
                </View>
            )}
        />

      </View>
    )
  }


const style = StyleSheet.create({
    main: {
        backgroundColor: '#040575',
        height: '100%',
      },
      factionCard: {
        backgroundColor: 'white',
        width: 350,
        height: 120,
        borderRadius: 10,
        marginInline: 'auto',
        marginBlock: 20,
      },
      factionIcon: {
        height: 38,
        width: 38,
        marginTop: 14,
        marginLeft: 20,
      },
      factionName: {
        marginLeft: 13,
      },
      factionCaptain: {
        marginLeft: 20,
        marginTop: 10,
      },
      factionCardButton: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: 103,
        height: 31,
        borderRadius: 10,
        backgroundColor: 'gold',
        marginRight: 20,
      },
      factionCardButtonText: {
        textAlign: 'center',
      },
});

export default YourFaction