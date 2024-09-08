import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Feather from "@expo/vector-icons/Feather";
import { AboutStack } from "./AppStack";
import { useNetInfo } from "@react-native-community/netinfo";
import { Button, Text, View, StyleSheet } from "react-native";
import { useState } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  const netInfo = useNetInfo();
  const [checkedConnection, setCheckedConnection] = useState(false);

  const handleRetry = () => {
    setCheckedConnection(!checkedConnection); // триггерим перерендер приложения
  };
  if (!netInfo.isConnected) {
    return (
      <View style={styles.noConnection}>
        <Text>Нет соединения</Text>
        <Button title="Попробовать еще раз" onPress={handleRetry} />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarStyle: { backgroundColor: "#2e2e2e" },
          }}
        >
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
    );
  }
}

const styles = StyleSheet.create({
  noConnection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
});
