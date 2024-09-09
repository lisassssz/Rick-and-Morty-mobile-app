import { View, Text, StyleSheet, Platform, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
export default function CharacterCard({
  name,
  status,
  species,
  location,
  image,
  episode,
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Image source={{ uri: `${image}` }} style={styles.image} />
      <View style={styles.textBlock}>
        <View>
          <Text style={[{ color: colors.text }, styles.name]}>{name}</Text>
          <View style={styles.characteristic}>
            <View
              style={[
                status === "Alive"
                  ? styles.alive
                  : status === "Dead"
                  ? styles.dead
                  : styles.unknown,
                styles.circle,
              ]}
            ></View>
            <Text style={[{ color: colors.text }, styles.status]}>
              {status} - {species}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.extraText}>Last known location:</Text>
          <Text style={{ color: colors.text }}>{location}</Text>
        </View>
        <View>
          <Text style={styles.extraText}>First seen in:</Text>
          <Text style={{ color: colors.text }}>{episode}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    width: "40%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  textBlock: {
    width: "60%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  extraText: {
    color: "#9e9e9e",
  },
  name: {
    fontSize: 20,
  },
  status: {
    fontWeight: "bold",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  alive: {
    backgroundColor: "#b9f830",
  },
  dead: {
    backgroundColor: "#f84f30",
  },
  unknown: {
    backgroundColor: "#9e9e9e",
  },
  characteristic: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
