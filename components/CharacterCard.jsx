import { View, Text, StyleSheet, Platform, Image } from "react-native";

export default function CharacterCard({
  name,
  status,
  species,
  location,
  image,
  episode,
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: `${image}` }} style={styles.image} />
      <View style={styles.textBlock}>
        <View>
          <Text style={[styles.mainText, styles.name]}>{name}</Text>
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
            <Text style={[styles.mainText, styles.status]}>
              {status} - {species}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.extraText}>Last known location:</Text>
          <Text style={styles.mainText}>{location}</Text>
        </View>
        <View>
          <Text style={styles.extraText}>First seen in:</Text>
          <Text style={styles.mainText}>{episode}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#424242",
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
  mainText: {
    color: "#ffffff",
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
