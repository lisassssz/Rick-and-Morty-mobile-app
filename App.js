import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Feather from "@expo/vector-icons/Feather";
import { AboutStack } from "./AppStack";

const Tab = createBottomTabNavigator();

export default function App() {
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
