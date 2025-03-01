import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { View , Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView} from "react-native";
import { Ionicons } from '@expo/vector-icons';



const AdminDashboard = () =>{

    const [memberCounter, setMemberCounter] = useState(0);
    const [unvalidate, setUnvalidate] = useState(0);
    const [staff, setStaff] = useState(0);

    const [unvalidateArray, setUnvalidateArray] =useState([]);

    const countMember = async() => {
        try {
            const res = await axios.get('https://tall-debonair-danger.glitch.me/membersCount');
            setMemberCounter(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const countUnvalidate = async()=>{
        try {
            const res = await axios.get('https://tall-debonair-danger.glitch.me/checkUnvalidate');
            setUnvalidate(res.data.length);
        } catch (error) {
            console.error(error);
        }
    };

    const countStaff = async()=>{
        try {
            const res = await axios.get('https://tall-debonair-danger.glitch.me/checkStaff');
            setStaff(res.data.length);
        } catch (error) {
            console.error(error);
        }
    };

    const showUnvalidate = async()=>{
        try {
            const res = await axios.get('https://tall-debonair-danger.glitch.me/checkUnvalidate');
            setUnvalidateArray(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const validateStudent = async(userId)=>{
        try {
            const res = await axios.post('https://tall-debonair-danger.glitch.me/validate', {userId : userId});
            if(res.status == 200){
                Alert.alert("Utilisateur validé");
                showUnvalidate();
            }
        } catch (error) {
            
        }
    }

    const cancelStudent = async(userId)=>{
        try {
            const res = await axios.post('https://tall-debonair-danger.glitch.me/cancel', {userId : userId});
            if(res.status == 200){
                Alert.alert("Utilisateur refusé");
                showUnvalidate();
            }
        } catch (error) {
            
        }
    }



    useFocusEffect(() => {
        countMember();
        countUnvalidate();
        countStaff();
        showUnvalidate();
    });

    return(
        <View style={style.main}>
            <Text style={style.title}>Admin Dashboard</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={style.counterContainer}>
                <Text style={style.counterTitle}>Membres :</Text>
                <Text style={style.counter}>{memberCounter}</Text>
            </View>
            <View style={style.counterContainer}>
            <Text style={style.counterTitle}>Non confirmé :</Text>
            <Text style={style.counter}>{unvalidate}</Text>
            </View>
            </View>
            <View style={style.counterContainer}>
            <Text style={style.counterTitle}>Staff :</Text>
            <Text style={style.counter}>{staff}</Text>
            </View>

            <Text style={style.title}>Validations</Text>
            <FlatList
  data={unvalidateArray}
  keyExtractor={(item) => item.id.toString()} 
  renderItem={({ item }) => (  
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={style.validationCard}>
      <Text style={style.validationCardText}>{item.username}</Text>
      <Text style={style.validationCardText}>{item.id}</Text>
      <Text style={style.validationCardText}>{item.mail}</Text>
      <TouchableOpacity onPress={() => { validateStudent(item.id) }}>
        <Ionicons style={style.validationCardIcon} name="checkmark-circle-outline" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {cancelStudent(item.id) }}>
        <Ionicons style={style.validationCardIcon} name="close-circle-outline" size={24} />
      </TouchableOpacity>
    </View>
    </ScrollView>
  )}
/>



            

            
        </View>
    );
}

const style = StyleSheet.create({
    main:{
        backgroundColor: 'rgb(0, 0, 175)',
        height: '100%'
    },
    title:{
        textAlign: 'center',
        fontSize: 20, 
        color: 'white',
        marginBlock: 10
    },
    counterContainer:{
        width: 140,
        height: 101,
        backgroundColor: '#2A43CA',
        borderRadius: 10,
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        elevation: 10,
        marginLeft: 30,
        marginTop: 15
    },
    counterTitle:{
         fontSize: 20, 
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    counter:{
        fontSize: 40, 
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    validationCard:{
        width: 'auto',
        height: 40,
        margin: 'auto',
        backgroundColor: '#2A43CA',
        borderRadius: 10,
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        elevation: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'scroll'
    },
    validationCardText:{
        textAlign: 'left',
        color: 'white',
        marginInline: 8,
        fontSize: 11
    },
    validationCardIcon:{
        color: 'white',
        marginInline: 3
    },


});

export default AdminDashboard;