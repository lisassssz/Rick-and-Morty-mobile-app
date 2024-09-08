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

import CharacterCard from "../components/CharacterCard";
import { useEffect, useState } from "react";
import { fetchChatacters } from "../src/service/fetchCharacters";
import { Loading } from "../components/Loading";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExtraLoading, setIsExtraLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true); // для отслеживания страниц

  //для фильтров
  const [selected, setSelected] = useState([]);

  const data = [
    { key: "1", value: "Alive" },
    { key: "2", value: "Dead" },
    { key: "3", value: "unknown" },
    { key: "4", value: "Human" },
    { key: "5", value: "Alien" },
  ];

  useEffect(() => {
    const initialFunction = async () => {
      // setIsExtraLoading(true);
      setIsLoading(true);
      let items = await fetchChatacters(currentPage);
      setItems(items);
      setHasMorePages(items.length > 0); // обновляем статус наличия страниц
      // setIsExtraLoading(false);
      setIsLoading(false);
    };
    initialFunction();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selected, items]);

  const applyFilters = () => {
    if (selected.length === 0) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => {
        return selected.every((filter) => {
          return item.status === filter || item.species === filter;
        });
      });
      setFilteredItems(filtered);
    }
  };

  const fetchMore = async () => {
    if (isExtraLoading || !hasMorePages || filteredItems.length === 0) return;
    setIsExtraLoading(true);
    const nextPage = currentPage + 1;
    let charactersList = await fetchChatacters(nextPage);
    setItems([...items, ...charactersList]);
    setCurrentPage(nextPage);
    setHasMorePages(charactersList.length > 0); // обновляем статус наличия страниц
    setIsExtraLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        label="Filters"
        inputStyles={{ color: "white" }}
        dropdownTextStyles={{ color: "white" }}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchChatacters} />
        }
        data={filteredItems}
        keyExtractor={(item) => Math.random().toString(36).substring(2)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Character", {
                id: item.id,
                title: item.name,
              })
            }
          >
            <CharacterCard
              name={item.name}
              status={item.status}
              species={item.species}
              location={item.location.name}
              image={item.image}
              episode={item.firstEpisodeName}
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
        ListEmptyComponent={() => (
          <Text style={styles.empty}>There are no such characters</Text>
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
  empty: {
    color: "white",
    fontSize: 16,
    marginLeft: 16,
  },
});
