import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Text, View } from "react-native";


const ClubInfo = () => {
    const [memberCounter, setMemberCounter] = useState(0);

    const countMember = async() => {
        try {
            const res = await axios.get('https://tall-debonair-danger.glitch.me/membersCount');
            setMemberCounter(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(() => {
        countMember();
    });
    return(
       <View>
         <Text>Club Info:</Text>
         <Text>Nombre de membres: {memberCounter}</Text>
       </View>
        
    )
}

export default ClubInfo;