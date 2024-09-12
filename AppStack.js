import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CharacterScreen from "./screens/CharacterScreen";
import { useWindowDimensions } from "react-native";

const Stack = createNativeStackNavigator();

export const AboutStack = () => {
  const windowWidth = useWindowDimensions().width;

  // адаптивные размеры
  const isSmallScreen = windowWidth < 768;
  const headerTextSize = isSmallScreen ? 22 : 28;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontSize: headerTextSize },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <AboutStack />
    </NavigationContainer>
  );
}
