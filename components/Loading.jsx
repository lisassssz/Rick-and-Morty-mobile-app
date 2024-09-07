import { Text, View, ActivityIndicator, StyleSheet } from "react-native";

export const Loading = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
      <Text style={styles.loaderText}>Загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
