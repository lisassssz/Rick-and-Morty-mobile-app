import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Feather from "@expo/vector-icons/Feather";
import { AboutStack } from "./AppStack";
import { useNetInfo } from "@react-native-community/netinfo";
import { Button, Text, View, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { DarkTheme } from "./themes";
import { LightTheme } from "./themes"; //для проверки светлой темы
import { useTheme } from "@react-navigation/native";
import { store } from "./app/store";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setTheme } from "./features/theme/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

function AppContent() {
  const netInfo = useNetInfo();
  const [checkedConnection, setCheckedConnection] = useState(false);
  const { colors } = useTheme();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const dispatch = useDispatch();
  const handleRetry = () => {
    setCheckedConnection(!checkedConnection); // триггерим перерендер приложения
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("isDarkTheme");
        if (savedTheme !== null) {
          dispatch(setTheme(JSON.parse(savedTheme)));
        }
      } catch (e) {
        Alert.alert("Ошибка", "Не удалось установить сохраненную тему");
        console.error("Не удалось загрузить тему из AsyncStorage", error);
      }
    };
    getData();
  }, [dispatch]); // устанавливаем тему при запуске

  if (!netInfo.isConnected) {
    return (
      <View style={styles.noConnection}>
        <Text>Нет соединения</Text>
        <Button title="Попробовать еще раз" onPress={handleRetry} />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
          <Tab.Navigator>
            <Tab.Screen
              name="Characters"
              component={AboutStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <Feather name="list" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Feather name="settings" size={24} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  noConnection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
});
