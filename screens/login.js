import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import { useState } from "react";
import { saveUser, getUser } from "./components/storage";
import {jwtDecode} from 'jwt-decode'
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () =>{
    const navigation = useNavigation();
       const alert = Alert.alert;
        const [loginForm, setLoginForm] = useState({
            clubId: '',
            password: ''
        });

        const handleChange = (name, value) => setLoginForm(prevState => ({ ...prevState, [name]: value }));

        const verifyLog = async () => {
            try {
                const value = await AsyncStorage.getItem('isLoggedIn')
                if(value == 'true'){
                    navigation.navigate('Profile');
                }
            } catch (error) {
                
            }
        
        }

        const handleLogin = async() =>{
            alert("Trying to connect","Please wait");
            if(loginForm.clubId != '' && loginForm.password != ''){
               try {
                const response = await axios.post("https://tall-debonair-danger.glitch.me/login",loginForm, { withCredentials: true } );
                if(response.status === 200){
                    const userInfo = response.data.userInfo;
                    const id = userInfo.id;
                    const username = userInfo.username;
                    const mail = userInfo.mail;
                    const role = userInfo.role;

                    if(role == 'Admin'){
                        await AsyncStorage.setItem('isAdmin', 'true');
                        alert('Connexion reussie','Bienvenue '+username+' vous etes un admin');
                    }

                    alert("Connexion reussie","Bienvenue "+username);
                    await AsyncStorage.setItem('id', id);
                    await AsyncStorage.setItem('username', username);
                    await AsyncStorage.setItem('mail', mail);
                    await AsyncStorage.setItem('role', role);
                    
                    
                    await AsyncStorage.setItem('isLoggedIn', 'true');
                    navigation.navigate('Profile')
                }
               } catch (error) {
                alert(error);
               }
            }else{
                alert("Connexion échouée","Veuillez remplir tous les formulaires")
            }
        }

        useFocusEffect(()=>{
            verifyLog();
        }); 

    return(
        <View>
            <View style={style.form}>
            <Text style={style.formTitle}>Se connecter</Text>
            <Text style={style.formText}>ID utilisateur :</Text>
            <TextInput onChangeText={(value)=>{handleChange("clubId",value)}} placeholder="JV24***" style={style.formInput} value={loginForm.clubId}/>
            <Text style={style.formText}>Mot de passe :</Text>
            <TextInput onChangeText={(value)=>{handleChange("password",value)}} placeholder="Mot de passe" style={style.formInput} value={loginForm.password}/>
            <TouchableOpacity onPress={()=>{handleLogin()}}><Text style={style.formButton}>Se connecter</Text></TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Inscription')}}><Text style={style.formLink}>S'inscrire</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
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
    formTitle:{
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
        borderRadius: 10,
        width: 250,
    },
    formText:{
        color: 'white',
        marginInlineEnd: 140,
        marginBlock: 5,
    },
    formButton:{
        borderRadius: 10,
        width: 150,
        height: 40,
        color: 'white',
        backgroundColor: '#F1B708',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginBlockStart: 10
    },
    formLink:{
        color:'#F1B708',
        marginBlockStart: 10,
        marginBlockEnd: -30
    }
});

export default Login;