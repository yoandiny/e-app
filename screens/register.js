import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";


const Register = () =>{

    const navigation = useNavigation();
    const alert = Alert.alert;
    const [registerForm, setRegisterForm] = useState({
        studentId: '',
        username: '',
        mail: '',
        password: ''
    });

    const handleChange = (name, value) => setRegisterForm(prevState => ({ ...prevState, [name]: value }));


    const handleSubmit = async() =>{
      if(registerForm.studentId !=''&& registerForm.username !=''&& registerForm.mail !='' && registerForm.password != '' ){
        if(registerForm.studentId.startsWith("STD")){
            if(registerForm.mail.endsWith("@mail.hei.school")){
                if(registerForm.password.length >= 6){
                    const response = await axios.post("https://tall-debonair-danger.glitch.me/register",registerForm);
                    if(response.status == 200){
                        alert("Inscription reussie","Vous pouvez maintenant vous connecter")
                        navigation.navigate("Connexion")
                    }
                }else{
                    alert("Inscription échouée","Veuillez saisir un mot de passe avec au moins 6 caractères")
                }
            }else{
                alert("Veuillez saisir un mail HEI valide")
            }
        }else{
            alert("Inscription échouée","Veuillez correctement saisir votre STD")
        }
      }else{
        alert("Inscription échouée","Veuillez remplir tous les formulaires")
      }
    }

   return(
          <View>
              <View style={style.form}>
              <Text style={style.formTitle}>S'inscrire</Text>
              <Text style={style.formText}>ID Etudiant :</Text>
              <TextInput onChangeText={(value)=>{handleChange("studentId",value)}}  placeholder="STD2****" style={style.formInput} value={registerForm.studentId}/>
              <Text style={style.formText}>Nom d'utilisateur :</Text>
              <TextInput onChangeText={(value)=>{handleChange("username",value)}}  placeholder="John Doe" style={style.formInput} value={registerForm.username}/>
              <Text style={style.formText}>Adresse mail :</Text>
              <TextInput onChangeText={(value)=>{handleChange("mail",value)}}  placeholder="student@mail.hei.school" style={style.formInput} value={registerForm.mail}/>
              <Text style={style.formText}>Mot de passe :</Text>
              <TextInput onChangeText={(value)=>{handleChange("password",value)}}  placeholder="Mot de passe" style={style.formInput} value={registerForm.password}/>
              <TouchableOpacity onPress={()=>{handleSubmit()}}><Text style={style.formButton}>S'inscrire</Text></TouchableOpacity>
  
              <TouchableOpacity onPress={()=>{navigation.navigate('Connexion')}}><Text style={style.formLink}>Se connecter</Text></TouchableOpacity>
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
        height: 450,
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

export default Register;