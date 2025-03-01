import { View, Text,StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {

    
    
    const navigation = useNavigation();

 


    return (
        <View>
            <Text style={style.homeScreenTitle}>Bienvenue</Text>
            <Button onPress={()=>{navigation.navigate('Connexion')}} title="Hi"/>

        </View>
    );
}

const style = StyleSheet.create({
    homeScreenTitle:{
        textAlign: 'center',
        fontSize: 20
    }
})

export default HomeScreen;