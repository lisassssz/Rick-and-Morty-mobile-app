import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHARACTER_LIMIT = 20; // ограничение на количество сохраненных персонажей

export const fetchChatacters = async (page, isConnected) => {
  if (!isConnected) {
    return await getCharactersFromLocal();
  }

  try {
    let response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    // для каждого персонажа получаем имя первого эпизода
    const characters = await Promise.all(
      response.data.results.map(async (character) => {
        if (character.episode.length > 0) {
          let episodeResponse = await axios.get(character.episode[0]);
          // добавляем имя эпизода в объект персонажа
          character.firstEpisodeName = episodeResponse.data.name;
        } else {
          character.firstEpisodeName = "Unknown episode";
        }
        return character;
      })
    );

    // сохраняем последних 20 персонажей
    await saveCharactersToLocal(characters);

    return characters;
  } catch (error) {
    console.error("Error fetching characters: ", error);
    Alert.alert("Error", "Failed to get characters");
    return [];
  }
};

const saveCharactersToLocal = async (newCharacters) => {
  try {
    const storedCharacters = await getCharactersFromLocal();
    const updatedCharacters = [...newCharacters, ...storedCharacters];

    const limitedCharacters = updatedCharacters.slice(0, CHARACTER_LIMIT);

    await AsyncStorage.setItem(
      "rickAndMortyCharacters",
      JSON.stringify(limitedCharacters)
    );
  } catch (error) {
    console.log("Error saving characters to local storage", error);
  }
};

const getCharactersFromLocal = async () => {
  try {
    const storedCharacters = await AsyncStorage.getItem(
      "rickAndMortyCharacters"
    );
    return storedCharacters ? JSON.parse(storedCharacters) : [];
  } catch (error) {
    console.log("Error getting characters from local storage", error);
    return [];
  }
};
