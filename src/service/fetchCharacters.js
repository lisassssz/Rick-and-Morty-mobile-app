import axios from "axios";
import { Alert } from "react-native";

export const fetchChatacters = async (page) => {
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

    return characters;
  } catch (error) {
    console.error("Error fetching characters: ", error);
    Alert.alert("Ошибка", "Не удалось получить персонажей");
    return [];
  }
};
