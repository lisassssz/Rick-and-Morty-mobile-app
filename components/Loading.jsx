import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export const Loading = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.loader, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" />
      <Text style={[{ color: colors.text }, styles.loaderText]}>
        Загрузка...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 15,
  },
});
