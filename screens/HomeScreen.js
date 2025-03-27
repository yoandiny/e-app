import { View, Text,StyleSheet, TextInput, TouchableOpacity, Alert,Image, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";
import { sendGlobalNotification } from "./components/sendNotification";






const HomeScreen = () => {

    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const [allPost, setAllPost] = useState([]);
    
    
    
   
    const navigation = useNavigation();

 
    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            setUsername(value);
            
        } catch (error) {
            
        }
    }

    const handlePublish = async () => {
        
        try {
            const postForm = {
                content: content,
                username: username
            };
            
            const res = await axios.post("https://tall-debonair-danger.glitch.me/publish", postForm);
            if(res.status == 200){
                Alert.alert("Publication effectuée");
                setContent('');
                getAllPost();

                const notification = {
                    title: 'Nouvelle publication !',
                    body: `${username} à fait une nouvelle publication`
                }
                sendGlobalNotification(notification.title, notification.body);

               
                
                
            }
        } catch (error) {
            
        }
    };

    const getAllPost = async () => {
        try {
            const res = await axios.get("https://tall-debonair-danger.glitch.me/getPosts");
            setAllPost(res.data);
        } catch (error) {
            
        }
    }

    const handleChange = (value) => setContent(value);

    useFocusEffect(()=>{
        getUsername();
        getAllPost();
    });

    


    return (
        <View style={style.main}>
            <View style={style.publishIsland}>
                <TextInput onChangeText={handleChange} value={content} style={style.publishForm} placeholder="Quoi de neuf"/>
                <TouchableOpacity onPress={handlePublish} style={style.publishButton}><Text>Publier</Text></TouchableOpacity>
            </View>
            
            
            <FlatList data={allPost} keyExtractor={(item) => item.pub_id.toString()} renderItem={({item}) =>(
                <View style={style.postCard}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/default_profile.png')} style={style.postCardImage}/>
                <Text style={{textAlign: 'left', marginRight: 'auto', marginLeft: -35}}>{item.username}</Text>
                {/* <Text style={{textAlign: 'left', marginRight: 'auto'}}>Publié le :{item.pub_date}</Text> */}
                </View>
                <View style={style.insidePostCard}>
                    <Text style={style.content}>{item.content}</Text>
                </View>
            </View>
            )}/>
            

        </View>
    );
}

const style = StyleSheet.create({
    main:{
        backgroundColor: '#040575',
        height: '100%'
    },
    publishIsland:{
        backgroundColor: 'white',
        width: 350,
        height: 100,
        borderRadius: 10,
        marginInline: 'auto',
        marginBlock: 20

    },
    publishForm:{
        backgroundColor: 'white',
        width: 320,
        height: 50,
        borderColor: '#9f8d8d',
        elevation: 10,
        borderRadius: 10,
        marginInline: 'auto',
        marginBlock: 'auto'
    },
    publishButton:{
        backgroundColor: '#aca5a5',
        width: 100,
        height: 30,
        marginLeft: 'auto',
        marginBlock: 'auto',
        marginRight: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    postCard:{
        width: 320,
        height: 'auto',
        backgroundColor: 'white',
        marginInline: 'auto',
        borderRadius: 10,
        marginBottom: 5
    },
    insidePostCard:{
        width: 300,
        height: 'auto',
        backgroundColor: 'white',
        borderColor: '#808080',
        borderWidth: 1,
        elevation: 10,
        borderRadius: 10,
        marginInline: 'auto',
    },
    postCardImage:{
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 'auto',
        marginLeft: 10,
        marginBlock: 10
    },
    content:{
        width: 300,
        height: 'auto',
       
    }
})

export default HomeScreen;