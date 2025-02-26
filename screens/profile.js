import { View, Text, StyleSheet } from "react-native";


const Profile = () => {
    return (
        <View>
            <Text style={style.text}>Profile</Text>
        </View>
    );
}

const style = StyleSheet.create({
    text:{
        color: 'red'
    }
});

export default Profile;