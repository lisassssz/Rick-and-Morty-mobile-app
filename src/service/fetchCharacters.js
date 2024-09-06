import axios from "axios";

export const fetchChatacters = async (page) => {
  try {
    let response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    return response.data.results;
  } catch (error) {}
};

// const fetchChatacters = () => {
//     setIsLoading(true);
//     axios
//       .get("https://rickandmortyapi.com/api/character?page=2")
//       .then(({ data }) => {
//         setItems(data.results);
//       })
//       .catch((err) => {
//         console.log(err);
//         Alert.alert("Ошибка", "Не удалось получить персонажей");
//       })
//       .finally(() => setIsLoading(false));
//   };
