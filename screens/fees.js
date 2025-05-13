import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { Component, useState } from 'react'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


 const Fees = ()=> {

  const [selectedMonth, setSelectedMonth] = useState('');
  const [transactionId, setTransactionId] = useState('');

     const navigation = useNavigation();

      const handleChange = (value) => setTransactionId(value);


  const verifyLog = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn')
            if(value == 'true'){
                
            }else{
                navigation.navigate('Connexion');
            }
        } catch (error) {
            
        }
    
    };

    const sendFee = async () => {
  if (!selectedMonth || !transactionId) {
    Alert.alert("Erreur", "Veuillez remplir tous les champs");
    return;
  }

  try {
    const value = await AsyncStorage.getItem('id');
    const feeForm = {
      id: value,
      month: selectedMonth,
      ref: transactionId
    };
    const res = await axios.post(`https://tall-debonair-danger.glitch.me/setFee`, feeForm);
    if (res.status === 200) {
      Alert.alert('Succès', 'Cotisation enregistrée');
      setSelectedMonth('');
      setTransactionId('');
    }
  } catch (error) {
    Alert.alert("Erreur", "Une erreur est survenue");
    console.error(error);
  }
};




    useFocusEffect(()=>{
      verifyLog();
    })


    return (
      <View style={style.main}>
       <View style={style.mainContainer}>
        <View style={style.textContainer}>
          <Text style={style.text}>
            Pour régler votre cotisation par Mobile Money veuillez transférer les fonds sur le compte suivant :
          </Text>
          <Text style={style.text}>
            032 35 410 89 - Nomena Harilala
          </Text>

          <View style={style.form}>
            <Text style={style.formText}>Mois</Text>
            <Picker style={style.formInput} selectedValue={selectedMonth} onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}>
              <Picker.Item label="-- Veuillez choisir un mois --"/>
              <Picker.Item label="Janvier" value="Janvier" />
              <Picker.Item label="Fevrier" value="Fevrier" />
              <Picker.Item label="Mars" value="Mars" />
              <Picker.Item label="Avril" value="Avril" />
              <Picker.Item label="Mai" value="Mai" />
              <Picker.Item label="Juin" value="Juin" />
              <Picker.Item label="Juillet" value="Juillet" />
              <Picker.Item label="Aout" value="Aout" />
              <Picker.Item label="Septembre" value="Septembre" />
              <Picker.Item label="Octobre" value="Octobre" />
              <Picker.Item label="Novembre" value="Novembre" />
              <Picker.Item label="Decembre" value="Decembre" />
            </Picker>
            <Text style={style.formText}>
               Référence Mobile Money
            </Text>
            <TextInput placeholder='N° de transaction' value={transactionId} name='transactionId' onChangeText={(value)=>{handleChange(value);}} style={style.formInput}/>

            <TouchableOpacity onPress={()=>{sendFee();}} style={style.formButton}>
              <Text style={style.formTextButton}>Valider</Text>
            </TouchableOpacity>
          </View>
          

        </View>
       </View>
      </View>
    )
}

const style = StyleSheet.create({
  main:{
      backgroundColor: '#040575',
      height: '100%'
  },
  text:{
      color: 'white',
  },
  textContainer:{
      width: 326,
      height: 80,
      marginBottom: 5,
      marginInline: 'auto',
      paddingInline: 5,
      marginTop: 12,
      borderRadius: 10,
      backgroundColor: '#2a43ca',
      borderColor: 'white',
      borderWidth: 1
  },
  mainContainer:{
    marginInline: 'auto',
    height: '100%',
    width: 370,
    marginBottom: 5,
    paddingInline: 5,
      borderRadius: 10,
      backgroundColor: '#2a43ca',
      borderColor: 'white',
      borderWidth: 1
  },
  form:{
    backgroundColor: '#040575',
    marginInline: 'auto',
    marginBlock: 100,
    borderRadius: 10,
    boxShadow: '0px 4px 4px black',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: 329,
    height: 300,
    
  },
  formText:{
    color: 'white',
    textAlign: 'center',
    marginBlockStart: -40,
    marginBlockEnd: 0,
    fontSize: 20,
    fontFamily: 'Roboto'
  },
  formInput:{
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
    marginBlock: 5,
    borderRadius: 5,
    width: 250,
    height: 50,
    marginBottom: 50
  },
  formButton:{
    backgroundColor: 'white',
    marginInline: 'auto',
    marginBlock: 5,
    borderRadius: 5,
    width: 150,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center'
  },
  formTextButton:{
    color: 'black',
    textAlign: 'center',
    marginBlockEnd: 0,
    fontSize: 20,
    fontFamily: 'Roboto'
  },
  

});

export default Fees;