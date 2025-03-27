import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { View , Text, StyleSheet, TouchableOpacity, } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Dashboard from "./adminComponent/dashboard";
import { FactionAdmin } from "./adminComponent/factionAdmin";
import Finances from "./adminComponent/finances";



const AdminDashboard = () =>{

    const [adminScreen, setAdminScreen] = useState(<Dashboard/>);
    const handleAdmin = (value)=>{
        switch (value) {
            case 1:
                setAdminScreen(<Dashboard/>);
                break;
            case 2:
                setAdminScreen(<FactionAdmin/>);
                break;
        
            case 3:
                setAdminScreen(<Finances/>);
                break;
        
            default:
                setAdminScreen(<Dashboard/>);
                break;
        }
    };







    return(
        <View style={style.main}>

            <View style={style.navbar}>
            <TouchableOpacity onPress={()=>handleAdmin(1)}>
                <Text style={style.text}>
                    Acceuil
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleAdmin(2)}>
                <Text style={style.text}>
                    Factions
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleAdmin(3)}>
                <Text style={style.text}>
                    Trésorerie
                </Text>
            </TouchableOpacity>

            </View>


            {adminScreen}
        </View>

       
    );
}
const style = StyleSheet.create({
    main:{
        backgroundColor: '#040575',
        height: '100%'
    },
    navbar:{
        width: 326,
        height: 33,
        marginBottom: 5,
        marginInline: 'auto',
        marginTop: 12,
        paddingInline: 5,
        borderRadius: 10,
        backgroundColor: '#2a43ca',
        borderColor: 'white',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',


    },
    text:{
        color: 'white',
        
    },
});



export default AdminDashboard;