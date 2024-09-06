import { MultipleSelectList } from "react-native-dropdown-select-list";
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
import { fetchChatacters } from "./src/service/fetchCharacters";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isExtraLoading, setIsExtraLoading] = useState(false);
  const [items, setItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  //для фильтров
  const [selected, setSelected] = useState([]);

  const data = [
    { key: "1", value: "Alive" },
    { key: "2", value: "Dead" },
    { key: "3", value: "Unknown" },
    { key: "4", value: "Human" },
    { key: "5", value: "Alien" },
  ];

  useEffect(() => {
    const initialFunction = async () => {
      setIsExtraLoading(true);
      let items = await fetchChatacters(currentPage);
      setItems(items);
      setIsExtraLoading(false);
    };
    initialFunction();
  }, []);

  const fetchMore = async () => {
    if (isExtraLoading) return;
    setIsExtraLoading(true);
    const nextPage = currentPage + 1;
    let charactersList = await fetchChatacters(nextPage);
    setItems([...items, ...charactersList]);
    setCurrentPage(nextPage);
    setIsExtraLoading(false);
  };

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
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        // onSelect={() => alert(selected)}
        label="Filters"
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchChatacters} />
        }
        data={items}
        keyExtractor={(item) => Math.random().toString(36).substring(2)}
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
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isExtraLoading ? (
            <ActivityIndicator size="large" style={{ marginBottom: 15 }} />
          ) : null
        }
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
