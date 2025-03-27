import axios from "axios";
import { Alert } from "react-native";


const GITHUB_REPO_URL = "https://api.github.com/repos/yoandiny/e-app/releases/latest";

export const checkForUpdates = async (currentVersion) => {
  try {
    const response = await axios.get(GITHUB_REPO_URL);
    const latestVersion = response.data.tag_name; // Tag de la dernière version sur GitHub

    // Comparer avec la version actuelle
    if (currentVersion !== latestVersion) {
      notifyUser(latestVersion);
    } else {
      return { updateAvailable: false };
    }
  } catch (error) {
    console.error("Erreur lors de la vérification des mises à jour :", error);
    return { updateAvailable: false };
  }
};

const notifyUser = (latestVersion) => {
  Alert.alert(
    "Mise à jour disponible",
    `Une nouvelle version (${latestVersion}) est disponible. Veuillez visiter le site pour télécharger la mise à jour.`,
    [
      { text: "Plus tard", onPress: () => console.log("Notification ignorée") },
      { text: "Télécharger", onPress: () => openGithubReleasePage() }
    ]
  );
};
