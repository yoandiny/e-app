import { Alert, Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export const AdminFees = () => {

  const [fees, setFees] = useState([]);

  const getFees = async () => {
    try {
      const res = await axios.get(`https://tall-debonair-danger.glitch.me/showFees`);
      if (res.status === 200) {
        setFees(res.data);
      } else {
        Alert.alert("Échec");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFee = async (id) => {
    try {
      const res = await axios.post(`https://tall-debonair-danger.glitch.me/deleteFee`, { id });
      if (res.status === 200) {
        Alert.alert("Cotisation supprimée !");
        getFees(); // Refresh
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de supprimer");
    }
  };

  const confirmFee = async (name, payment_id) => {
    try {
        const transForm = {
            type: 'Entree',
            amount: 2000,
            desc: `Cotisation de ${name}`

        };
      const res = await axios.post(`https://tall-debonair-danger.glitch.me/addTransaction`, transForm);
      if (res.status === 200) {
        await axios.post(`https://tall-debonair-danger.glitch.me/confirmFee`, { payment_id :  payment_id });
        Alert.alert("Cotisation confirmée !");
        
        getFees(); // Refresh
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de confirmer");
    }
  };

  

  useFocusEffect(() => {
    getFees();
  });

  return (
    <View style={style.main}>
      <Text style={style.title}>Cotisations Mobile Money</Text>

      <View style={style.tableContainer}>
        <View style={style.tableRow}>
          <Text style={[style.tableCell, style.header]}>Utilisateur</Text>
          <Text style={[style.tableCell, style.header]}>Mois</Text>
          <Text style={[style.tableCell, style.header]}>Référence</Text>
          <Text style={[style.tableCell, style.header]}>Actions</Text>
        </View>

        <FlatList
          data={fees}
          keyExtractor={(item) => item.payment_id}
          renderItem={({ item }) => (
            <View style={style.tableRow}>
              <Text style={style.tableCell}>{item.username}</Text>
              <Text style={style.tableCell}>{item.month}</Text>
              <Text style={style.tableCell}>{item.payment_ref}</Text>
              <View style={[style.tableCell, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                <TouchableOpacity style={style.confirmBtn} onPress={() => confirmFee(item.username, item.payment_id)}>
                  <Text style={style.btnText}>✅</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.deleteBtn} onPress={() => deleteFee(item.payment_id)}>
                  <Text style={style.btnText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: '#040575',
    height: '100%',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#2a43ca',
  },
  confirmBtn: {
    backgroundColor: '#34c759',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
});
