import axios from 'axios';
import { Alert } from 'react-native';

export const sendGlobalNotification = async(title, body) =>{
    const sendNotification = await axios.post("https://tall-debonair-danger.glitch.me/send-notification", {title: title, body: body});
    if(sendNotification.status == 200){
        
    }
};



// Fonction pour ouvrir la page de la release GitHub
const openGithubReleasePage = () => {
  const githubReleasesUrl = "https://github.com/{owner}/{repo}/releases"; // Remplacez {owner}/{repo}
  Linking.openURL(githubReleasesUrl);
};
