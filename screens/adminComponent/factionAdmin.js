import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { ScrollView } from "react-native-web";


export const FactionAdmin = () => {
    const [factionName, setFactionName] = useState('');
    const [captainName, setCaptainName] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const CLIENT_ID = 'f6b24c0e4f907d3';   
    const [factions, setFactions] = useState([]);

    const getAllFactions = async () => {
        try {
            const res = await axios.get('https://tall-debonair-danger.glitch.me/getAllFactions');
            setFactions(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    

    
    // Fonction pour ajouter une faction avec un capitaine et un logo
    const addFaction = async () => {
       try {
            const res = await axios.post('https://tall-debonair-danger.glitch.me/addFaction', { name: factionName, captain: captainName, logo_url: logoUrl });
            if (res.status === 200) {
                Alert.alert("Succes", "Faction ajoutée");
                getAllFactions();
            }
       } catch (error) {
        console.error(error);
       }
    };

    const deleteFaction = async(factionId)=>{
        try {
            const res = await axios.post('https://tall-debonair-danger.glitch.me/deleteFaction', { factionId: factionId });
            if (res.status === 200) {
                Alert.alert("Succes", "Faction supprimée");
                getAllFactions();
            }
        } catch (error) {
            console.error(error);
        }
    };

    

    useFocusEffect(() => {
        getAllFactions();
    });

    return (
        <View style={styles.main}>
            <Text style={styles.title}>Gestion des Factions</Text>

            {/* Champ de saisie pour le nom de la faction */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom de la faction"
                    placeholderTextColor="#aaa"
                    value={factionName}
                    onChangeText={setFactionName}
                />
            </View>

            {/* Champ de saisie pour le nom du capitaine */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom du capitaine"
                    placeholderTextColor="#aaa"
                    value={captainName}
                    onChangeText={setCaptainName}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="URL du logo"
                    placeholderTextColor="#aaa"
                    value={logoUrl}
                    onChangeText={setLogoUrl}
                />
            </View>



            {/* Bouton pour ajouter la faction */}
            <TouchableOpacity style={styles.addButton} onPress={addFaction}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Ajouter la faction</Text>
            </TouchableOpacity>
            

            {/* Liste des factions */}
            <FlatList
                data={factions}
                keyExtractor={(item) => item.game_id}
                renderItem={({ item }) => (
                    <View style={styles.factionCard}>
                        <Image source={{ uri: item.icon_url }} style={styles.factionLogo} />
                        <View>
                            <Text style={styles.factionName}>{item.game_name}</Text>
                            <Text style={styles.factionCaptain}>Capitaine : {item.captain_name}</Text>
                        </View>

                        {/* Boutons Modifier et Supprimer */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.editButton}>
                                <Ionicons name="pencil" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{deleteFaction(item.game_id)}} style={styles.deleteButton}>
                                <Ionicons name="trash" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}scrollEnabled={true} scrollToOverflowEnabled={true} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#040575',
        height: '100%',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    input: {
        fontSize: 16,
        color: 'black',
        paddingVertical: 5,
    },
    logoButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    logoButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    logoPreview: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    factionCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    factionLogo: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    factionName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    factionCaptain: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
});

export default FactionAdmin;
