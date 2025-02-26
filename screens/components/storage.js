
import AsyncStorage from '@react-native-async-storage/async-storage'


export const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.log('Erreur de stockage utilisateur :', error);
    }
};

  export const getUser = async (key) => {
    try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            return user[key] || null; 
        }
        return null;
    } catch (error) {
        console.log('Erreur lors de la récupération des données utilisateur :', error);
        return null;
    }
};
  

