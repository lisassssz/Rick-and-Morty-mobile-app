import axios from "axios";

import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import CharacterCard from "./components/CharacterCard";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();

  const fetchChatacters = () => {
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => {
        setItems(data.results);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Не удалось получить персонажей");
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(fetchChatacters, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text style={styles.loaderText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchChatacters} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <CharacterCard
              name={item.name}
              status={item.status}
              species={item.species}
              location={item.location.name}
              image={item.image}
              episode={item.episode.name}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e2e",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  loader: {
    flex: 1,
    backgroundColor: "#2e2e2e",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 15,
    color: "white",
  },
});
