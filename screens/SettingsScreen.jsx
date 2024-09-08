import { View, Text, StyleSheet, Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Переключить на дневную тему</Text>
      <Feather name="sun" size={24} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e2e",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
