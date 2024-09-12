import { Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { useWindowDimensions } from "react-native";

export default function SettingsScreen() {
  const { colors } = useTheme();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;

  // адаптивные размеры
  const isSmallScreen = windowWidth < 768;
  const textFontSize = isSmallScreen ? 16 : 22;
  const iconSize = isSmallScreen ? 24 : 30;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(toggleTheme())}
    >
      <Text style={{ color: colors.text, fontSize: textFontSize }}>
        {isDarkTheme
          ? "Переключить на дневную тему"
          : "Переключить на ночную тему"}
      </Text>
      <Feather
        name={isDarkTheme ? "sun" : "moon"}
        size={iconSize}
        color={isDarkTheme ? "white" : "black"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
