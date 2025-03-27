import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const FactionChoose = () => {
  const [factions, setFactions] = useState([]);
  const [search, setSearch] = useState('');
  const [membershipStatus, setMembershipStatus] = useState({});
  const [studentId, setStudentId] = useState('')


  const handleSearch = async () => {
    try {
        const res = await axios.get(`https://tall-debonair-danger.glitch.me/searchFaction?search=${search}`);
        const factionsList = res.data;

        setFactions(factionsList);  

        
        const membershipData = {};
        for (const faction of factionsList) {
            const membershipRes = await axios.get(
                `https://tall-debonair-danger.glitch.me/checkMembership?studentId=${studentId}&factionId=${faction.game_id}`
            );

            membershipData[faction.game_id] = membershipRes.data.isMember; 
        }

        setMembershipStatus(membershipData); 

    } catch (error) {
        console.error("Erreur lors de la récupération des factions :", error);
    }
};


const handleMembership = async (factionId) => {
  try {
      const res = await axios.get(
          `https://tall-debonair-danger.glitch.me/checkMembership?studentId=${studentId}&factionId=${factionId}`
      );

      setMembershipStatus(prevData => ({
          ...prevData,
          [factionId]: res.data.isMember
      }));

  } catch (error) {
      console.error("Erreur lors de la vérification de l'adhésion :", error);
  }
};

  
  const handleJoin = async(game_id) =>{

   try {
    const res = await axios.post(`https://tall-debonair-danger.glitch.me/joinFaction`, {studentId: studentId, factionId: game_id});
    if(res.status === 200){
      Alert.alert("Succès", "Vous avez bien rejoins la faction")
      handleMembership(game_id);
    }else{
      Alert.alert("Echec")
    }
   } catch (error) {
    console.error("Error fetching factions:", error);
   }
  };

  const handleLeave = async(game_id) =>{
    try {
      const res = await axios.post(`https://tall-debonair-danger.glitch.me/leaveFaction`, {studentId: studentId, factionId: game_id});
      if(res.status === 200){
        Alert.alert("Succès", "Vous avez bien quitter la faction")
        handleMembership(game_id);
      }else{
        Alert.alert("Echec")
      }
    } catch (error) {
      console.error("Error fetching factions:", error);
    }
  };

  const getId = async () => {
    try {
        const value = await AsyncStorage.getItem('id');
        setStudentId(value);
        
    } catch (error) {
        
    }
}

  useFocusEffect(()=>{
    getId();

  })

  const handleChange = (value) => setSearch(value);


  return (
    <View style={style.main}>
      <View style={style.searchIsland}>
        <TextInput onChange={handleSearch}
          onChangeText={handleChange}
          value={search}
          style={style.searchBar}
          placeholder="Rechercher une faction..."
        />

      </View>

      <FlatList
    data={factions}
    keyExtractor={(item) => item.game_id.toString()}
    renderItem={({ item }) => (
        <View style={style.factionCard}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.icon_url }} style={style.factionIcon} />
                <Text style={style.factionName}>{item.game_name || 'Unknown'}</Text>
            </View>
            <Text style={style.factionCaptain}>Capitaine : {item.captain_name || 'Unknown'}</Text>

            {membershipStatus[item.game_id] ? (
                <TouchableOpacity onPress={() => handleLeave(item.game_id)} style={[style.factionCardButton, { backgroundColor: 'red' }]}>
                    <Text style={[style.factionCardButtonText, { color: 'white' }]}>Quitter</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => handleJoin(item.game_id)} style={style.factionCardButton}>
                    <Text style={style.factionCardButtonText}>Rejoindre</Text>
                </TouchableOpacity>
            )}
        </View>
    )}
/>

    </View>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: 'rgb(0, 0, 175)',
    height: '100%',
  },
  searchIsland: {
    backgroundColor: 'white',
    marginTop: 15,
    marginInline: 'auto',
    width: 340,
    height: 48,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 'auto',
    borderBlockColor: '#9f8d8d',
    borderWidth: 1,
    width: 320,
    height: 30,
    fontSize: 8,
  },
  icon: {
    marginRight: 'auto',
  },
  factionCard: {
    backgroundColor: 'white',
    width: 350,
    height: 120,
    borderRadius: 10,
    marginInline: 'auto',
    marginBlock: 10,
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

export default FactionChoose;
