import { View, Text, StyleSheet, TextInput,Alert, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native";
import { useCallback } from "react";



const Profile = () => {

 const [loggedIn, setLoggedIn]= useState('');
 const [role, setRole] = useState('');
 const [id, setId] = useState('');
 const [username, setUsername] = useState('')
 const [mail, setMail] = useState('')
 const [isAdmin, setIsAdmin] = useState('false')
 const navigation = useNavigation();
 const alert = Alert.alert;
 const [profileInfo, setProfileInfo]= useState({
    id : '',
    group: '',
    phone: '',
 });


    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            setUsername(value);
            
        } catch (error) {
            
        }
    }

    const getAdmin = async()=>{
      
        try {
            const value = await AsyncStorage.getItem('isAdmin');
            setIsAdmin(value);
        } catch (error) {
            
        }
        
        
      }

    const getRole = async () => {
        try {
            const value = await AsyncStorage.getItem('role');
            setRole(value);
            
        } catch (error) {
            
        }
    }
    const getId = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value) {
                setId(value);
                setProfileInfo(prev => ({ ...prev, id: value }));
            } else {
                console.error("ID manquant dans AsyncStorage !");
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const getMail = async () => {
        try {
            const value = await AsyncStorage.getItem('mail');
            setMail(value);
            
        } catch (error) {
            
        }
    }

    const checkLog = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn')
            setLoggedIn(value);

           
        } catch (error) {
            
        }
    }

    const verifyLog = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn')
            if(value == 'true'){
                
            }else{
                navigation.navigate('Connexion');
            }
        } catch (error) {
            
        }
    
    }

    const getProfileInfo = async () => {
        try {
           
            setUsername(value);
            const res = await axios.get(`https://tall-debonair-danger.glitch.me/getProfileInfo?username=${value}`);
            setProfileInfo(res.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAdmin = ()=>{
        navigation.navigate('adminDashboard');
    }

    const handleLogout = async()=>{
        try {
            const value = await AsyncStorage.setItem('isLoggedIn', 'false');
            setLoggedIn( value);
            const forAdmin = await AsyncStorage.setItem('isAdmin', 'false');
            setIsAdmin(forAdmin);
            navigation.navigate('Profile');
            verifyLog();
        } catch (error) {
            console.error(error);
        }
    }

    const handleMaintenance = ()=>{
        alert('Maintenance', "Cette partie de l'aplication n'est pas encore accessible")
    }

    const handleChange = (name, value) => setProfileInfo(prevState => ({ ...prevState, [name]: value }));

    const handleSubmit = async() =>{
        setProfileInfo[id] = 'JV';
        alert("Modification en cours","Veuillez patienter")
        const res = await axios.post("https://tall-debonair-danger.glitch.me/update", profileInfo );
        if(res.status == 200){
            alert("Modification reussie","Veuillez recharger la page")
        }else{
            alert("Error")
        }
    }


    useFocusEffect(
        useCallback(() => {
          checkLog();
          verifyLog();
          getId();
          getUsername();
          getMail();
          getRole();
          getAdmin();
        }, [])
      );
  



    return (
        <ScrollView style={style.main}>
            <View style={style.mainInfoContainer}>
                <View style={style.imageContainer}>
                <Image style={style.pdp} source={require('../assets/default_profile.png')}/>
                </View>
                <View style={style.infoContainer}>
                <Text style={style.username}>{username}</Text>
                <Text style={style.id}>{id}</Text>
                <Text style={style.member}>Membre depuis :</Text>
                </View>
                
            </View>
            <Text style={style.infoTitle}>Informations personnelles :</Text>
            <View style={style.infoCard}>
            <Ionicons style={style.icon} name="mail-outline" size={30}/>
            
                <Text style={style.indicationText}>Email :</Text>
                <Text style={[style.indicationText, {marginLeft: 80}]}>{mail}</Text>
            
            </View>
                <View style={{display:'flex', flexDirection:'row'}}>
                    <View style={[style.halfInfoCard, {marginLeft:14}]}>
                    <Ionicons style={style.icon} name="pricetag-outline" size={30}/>
                    <Text style={style.indicationText}>Role :</Text>
                    <Text style={[style.indicationText, {marginLeft: 25}]}>{role}</Text>
                    </View>
                    <View style={style.halfInfoCard}>
                    <Ionicons style={style.icon} name="people-outline" size={30}/>
                    <Text style={style.indicationText}>Groupe :</Text>
                    <TextInput style={[style.profileForm, {width: 50, marginLeft:7}]} placeholder="ex: K4" value={profileInfo.group} onChangeText={(value)=>{handleChange('group', value);}}/>
                    </View>
                </View>
                <View style={style.infoCard}>
                <Ionicons style={style.icon} name="phone-portrait-outline" size={30}/>
                <Text style={style.indicationText}>Téléphone :</Text>
                <TextInput style={[style.profileForm, {marginLeft: 7,}]} placeholder="ex: 0325869970" value={profileInfo.phone} onChangeText={(value)=>{handleChange('phone', value);}}/>
                </View>
                <View style={style.infoCard}>
                <Ionicons style={style.icon} name="game-controller-outline" size={30}/>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('factionChoose')
                }}>
                <Text style={style.indicationText}>Choisir votre faction</Text>
                </TouchableOpacity>
                
                </View>
                <TouchableOpacity style={style.infoButton} onPress={()=>{handleSubmit()}}>
                    <Text style={style.indicationText}>Enregistrer les informations</Text>
                </TouchableOpacity>

            <Text style={style.infoTitle}>Utilitaires :</Text>

            

            <TouchableOpacity onPress={()=>{handleMaintenance();}} style={style.infoCard}>
                <Ionicons style={style.icon} name="bar-chart-outline" size={30}/>
                <Text style={style.indicationText}>Statistiques joueur</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.infoCard} onPress={()=>{handleLogout()}}>
            <Ionicons style={style.icon} name="log-out-outline" size={30}/>
                <Text style={style.indicationText}>Déconnecter</Text>
            </TouchableOpacity>

            {isAdmin == 'true'? <TouchableOpacity style={style.infoCard} onPress={()=>{handleAdmin()}}>
            <Ionicons style={style.icon} name="terminal-outline" size={30}/>
                <Text style={style.indicationText}>Panel Staff</Text>
                </TouchableOpacity>: null}


            

            
            <View>
            
            
           
            

            </View>
            
            
            
           
        </ScrollView>
    );
}

const style = StyleSheet.create({
    main:{
        backgroundColor: 'rgb(0, 0, 175)',
        height: '100%'
    },
    mainInfoContainer:{
        alignItems: 'center',
        width: 324,
        height: 150,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        marginBlock: 20,
        marginInline: 'auto',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        elevation: 20

    },
    pdp:{
        width: 80,
        height: 80,
        marginLeft: 13
    },
    imageContainer: {
        alignItems: 'center',
        marginBlock: 10
    },
    title:{
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBlock: 10,
        marginLeft: 13,
        
    },
    username:{
        color: 'black',
        fontSize: 24,
        textAlign: 'left'
    },
    id:{
        color: 'black',
        fontSize: 15,
        textAlign: 'left'
    },
    member:{
        fontSize: 12,
        marginTop: 13
    },
    infoTitle:{
        color: 'white',
        marginTop: 32,
        marginLeft: 30,
        marginBottom: 17,
        fontSize: 15,
    },
    infoCard:{
        width:340,
        height:45,
        marginLeft: 14,
        marginTop: 2.26,
        backgroundColor: 'rgb(41, 89, 235)',
        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.49)', 
        borderWidth: 1,
        elevation: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
        
        
    },
    halfInfoCard:{
        width:170,
        height:45,
        marginLeft: 1,
        marginTop: 2.26,
        backgroundColor: 'rgb(41, 89, 235)',
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.62)',
        borderWidth: 1,
        elevation: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        color: 'white',
        marginLeft: 7,
        marginTop: 7
    },
    indicationText:{
        color: 'white',
        marginLeft: 7
    },
    profileForm:{
        color: 'black',
        width: 120,
        height:40,
    },
    infoButton:{
        alignItems: 'center',
        width: 150,
        height: 40,
        backgroundColor: '#2A43CA',
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.62)',
        borderWidth: 1,
        elevation: 10,
        marginTop: 10,
        marginInline: 110
    }

});

export default Profile;