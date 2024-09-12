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
  Modal,
  Button,
} from "react-native";

import CharacterCard from "../components/CharacterCard";
import { useEffect, useState } from "react";
import { fetchChatacters } from "../src/service/fetchCharacters";
import { Loading } from "../components/Loading";
import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExtraLoading, setIsExtraLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true); // для отслеживания страниц
  const { colors } = useTheme();
  const windowWidth = useWindowDimensions().width;

  const [selected, setSelected] = useState([]); //для фильтров
  const [isConnected, setIsConnected] = useState(true); // состояние сети
  const [modalVisible, setModalVisible] = useState(false);

  // адаптивные размеры
  const isSmallScreen = windowWidth < 768;
  const marginHorizontal = isSmallScreen ? 16 : 60;
  const fontSize = isSmallScreen ? 16 : 22;

  const data = [
    { key: "1", value: "Alive" },
    { key: "2", value: "Dead" },
    { key: "3", value: "unknown" },
    { key: "4", value: "Human" },
    { key: "5", value: "Alien" },
  ];

  // проверка подключения к интернету
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const initialFunction = async () => {
      setIsLoading(true);
      let items = await fetchChatacters(currentPage, isConnected);
      setItems(items);
      setHasMorePages(items.length > 0); // обновляем статус наличия страниц
      setIsLoading(false);
    };
    initialFunction();
  }, [isConnected]);

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

    if (!isConnected) {
      setModalVisible(true);
      return;
    }

    setIsExtraLoading(true);
    const nextPage = currentPage + 1;
    let charactersList = await fetchChatacters(nextPage, isConnected);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Пожалуйста, проверьте подключение к интернету и повторите попытку
            </Text>
            <Button
              title="Попробовать еще раз"
              onPress={() => {
                setModalVisible(false);
                fetchMore();
              }}
            />
          </View>
        </View>
      </Modal>
      <View style={{ marginHorizontal: marginHorizontal }}>
        <MultipleSelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          label="Filters"
          inputStyles={{ color: colors.text, fontSize: fontSize }}
          dropdownTextStyles={{ color: colors.text, fontSize: fontSize }}
          styleTextTag={{ fontSize: 22 }}
        />
      </View>
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
          <Text
            style={{
              color: colors.text,
              marginHorizontal: marginHorizontal,
              fontSize: fontSize,
            }}
          >
            There are no such characters
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});
