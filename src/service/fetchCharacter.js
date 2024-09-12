import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export const getCharacterFromLocal = async (id) => {
  try {
    const storedCharacters = await AsyncStorage.getItem(
      "rickAndMortyCharacters"
    );
    const characters = storedCharacters ? JSON.parse(storedCharacters) : [];
    return characters.find((char) => char.id === id);
  } catch (error) {
    console.log("Error getting character from local storage", error);
    return null;
  }
};

export const fetchCharacterData = async (id) => {
  try {
    const networkState = await NetInfo.fetch();
    if (networkState.isConnected) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const characterData = response.data;

      let firstEpisodeName = "Unknown episode";
      if (characterData.episode.length > 0) {
        try {
          const episodeResponse = await axios.get(characterData.episode[0]);
          firstEpisodeName = episodeResponse.data.name;
        } catch (err) {
          console.log("Error fetching episode data", err);
        }
      }

      return { characterData, firstEpisodeName };
    } else {
      const localCharacter = await getCharacterFromLocal(id);
      return localCharacter
        ? {
            characterData: localCharacter,
            firstEpisodeName:
              localCharacter.firstEpisodeName || "Unknown episode",
          }
        : { characterData: null, firstEpisodeName: "Unknown episode" };
    }
  } catch (error) {
    console.log("Error fetching character data", error);
    throw new Error("Failed to fetch character data");
  }
};
