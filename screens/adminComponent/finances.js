import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export const Finance = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionForm, setTransactionForm] = useState({
        type:'',
        amount: '',
        desc: ''
    })

    const totalBalance = transactions.reduce((acc, transaction) => {
        return transaction.trans_type == 'Entree' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    const getAllTransactions = async () => {
        try {
            const res = await axios.get('https://tall-debonair-danger.glitch.me/getAllTransactions');
            setTransactions(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const addTransaction = async()=>{
        try {
            for(const data of Object.values(transactionForm)){
                if(!data){
                    return alert('Veuillez remplir tous les champs');
                }else{
                    if(isNaN(transactionForm.amount)){
                        return alert('Veuillez saisir un montant valide');
                    }
                }
            }
            const res = await axios.post('https://tall-debonair-danger.glitch.me/addTransaction', transactionForm);
            if(res.status == 200){
                alert('Transaction ajoutée');
                getAllTransactions();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTransaction = async(id)=>{
        try {
            const res = await axios.post(`https://tall-debonair-danger.glitch.me/deleteTransaction`, {id: id});
            if(res.status == 200){
                alert('Transaction supprimée');
                getAllTransactions();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (field, value) => {
        setTransactionForm(prev => ({
            ...prev,
            [field]: value
        }));
    };
    

    useFocusEffect(()=>{
        getAllTransactions();
    })

    return (
        <View style={styles.main}>
            <Text style={styles.title}>Trésorerie du Club</Text>

            {/* Affichage du solde */}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Solde actuel :</Text>
                <Text style={[styles.balanceAmount, totalBalance >= 0 ? styles.positive : styles.negative]}>
                    {totalBalance.toLocaleString()} Ar
                </Text>
            </View>
           
            <View style={{display:'flex', flexDirection:'row'}}>
            <View style={[styles.inputContainer,{width: '50%'}]}>
                                        <TextInput
                                style={styles.input}
                                placeholder="Entrée ou Sortie"
                                placeholderTextColor="#aaa"
                                value={transactionForm.type}
                                onChangeText={(text) => handleChange('type', text)}
                            />
                        </View>

                <View style={[styles.inputContainer,{width: '50%'}]}>
                                        <TextInput
                            style={styles.input}
                            placeholder="Montant en Ar "
                            placeholderTextColor="#aaa"
                            value={transactionForm.amount}
                            onChangeText={(text) => handleChange('amount', text)}
                            keyboardType="numeric"
                        />
                </View>
            </View>
            <View style={styles.inputContainer}>
                                    <TextInput
                            style={styles.input}
                            placeholder="Description de la transaction"
                            placeholderTextColor="#aaa"
                            value={transactionForm.desc}
                            onChangeText={(text) => handleChange('desc', text)}
                        />
                </View>
             

            <TouchableOpacity onPress={addTransaction} style={styles.addButton}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Ajouter une transaction</Text>
            </TouchableOpacity>

            {/* Liste des transactions */}
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.trans_id}
                renderItem={({ item }) => (
                    <View style={styles.transactionCard}>
                        <Text style={styles.transactionText}>{item.trans_desc}</Text>
                        <Text style={[styles.transactionAmount, item.trans_type === 'Entree' ? styles.positive : styles.negative]}>
                            {item.trans_type === 'Entree' ? '+' : '-'} {item.amount.toLocaleString()} Ar
                        </Text>
                        
                        {/* Boutons Modifier & Supprimer */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.editButton}>
                                <Ionicons name="pencil" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>deleteTransaction(item.trans_id)} style={styles.deleteButton}>
                                <Ionicons name="trash" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Bouton pour ajouter une transaction */}
           
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
    balanceContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 18,
        color: 'gray',
    },
    balanceAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
    },
    positive: {
        color: 'green',
    },
    negative: {
        color: 'red',
    },
    transactionCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    transactionText: {
        fontSize: 16,
        flex: 1,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
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
    addButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
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
});

export default Finance;
