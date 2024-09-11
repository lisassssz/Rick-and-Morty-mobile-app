import { View, Text, StyleSheet, Platform, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

export default function CharacterCard({
  name,
  status,
  species,
  location,
  image,
  episode,
}) {
  const { colors } = useTheme();
  const windowWidth = useWindowDimensions().width;

  // адаптивные размеры
  const isSmallScreen = windowWidth < 768;
  const minImgSize = 100;
  const maxImgSize = 270;
  const imageSize = Math.min(
    maxImgSize,
    Math.max(minImgSize, windowWidth * 0.37)
  );
  const textFontSize = isSmallScreen ? 20 : 28;
  const extraTextFontSize = isSmallScreen ? 14 : 22;
  const textBlockPadding = isSmallScreen ? 10 : 20;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          marginHorizontal: isSmallScreen ? 16 : 60,
        },
      ]}
    >
      <Image
        source={{ uri: `${image}` }}
        style={[styles.image, { width: imageSize }]}
      />
      <View style={[styles.textBlock, { paddingVertical: textBlockPadding }]}>
        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: textFontSize,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
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
            <Text
              style={[
                { color: colors.text },
                styles.status,
                { fontSize: extraTextFontSize },
              ]}
            >
              {status} - {species}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.extraText, { fontSize: extraTextFontSize }]}>
            Last known location:
          </Text>
          <Text style={{ color: colors.text, fontSize: extraTextFontSize }}>
            {location}
          </Text>
        </View>
        <View>
          <Text style={[styles.extraText, { fontSize: extraTextFontSize }]}>
            First seen in:
          </Text>
          <Text style={{ color: colors.text, fontSize: extraTextFontSize }}>
            {episode}
          </Text>
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
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  textBlock: {
    width: "60%",
    paddingHorizontal: 12,
    // paddingVertical: 10,
    gap: 8,
  },
  extraText: {
    color: "#9e9e9e",
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
