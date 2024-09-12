import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { Loading } from "../components/Loading";
import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { fetchCharacterData } from "../src/service/fetchCharacter";

export default function CharacterScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [firstEpisodeName, setFirstEpisodeName] = useState("");
  const { id, title } = route.params;
  const { colors } = useTheme();
  const windowWidth = useWindowDimensions().width;

  // адаптивные размеры
  const isSmallScreen = windowWidth < 768;
  const flexDirection = isSmallScreen ? "column" : "row";
  const nameSize = isSmallScreen ? 30 : 36;
  const mainTextSize = isSmallScreen ? 18 : 24;
  const exrtaTextSize = isSmallScreen ? 16 : 22;
  const containerGap = isSmallScreen ? 15 : 50;
  const containerPadding = isSmallScreen ? 20 : 60;

  // установка диапазона размеров для изображения
  const minImageSize = 220;
  const maxImageSize = 500;
  const imageSize = Math.min(
    maxImageSize,
    Math.max(minImageSize, windowWidth * 0.4)
  );

  useEffect(() => {
    navigation.setOptions({
      title,
    });

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { characterData, firstEpisodeName } = await fetchCharacterData(
          id
        );
        if (characterData) {
          setData(characterData);
          setFirstEpisodeName(firstEpisodeName);
        } else {
          Alert.alert("Error", "Could not find character");
        }
      } catch (err) {
        Alert.alert("Error", "Could not get character");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          flexDirection: flexDirection,
          gap: containerGap,
          padding: containerPadding,
        },
      ]}
    >
      <Image
        source={{ uri: `${data.image}` }}
        style={[styles.image, { width: imageSize, height: imageSize }]}
      />
      <View style={{ gap: 15 }}>
        <View style={styles.textPair}>
          <Text style={{ color: colors.text, fontSize: nameSize }}>
            {data.name}
          </Text>
          <View style={styles.characteristic}>
            <View
              style={[
                data.status === "Alive"
                  ? styles.alive
                  : data.status === "Dead"
                  ? styles.dead
                  : styles.unknown,
                styles.circle,
              ]}
            ></View>
            <Text
              style={[
                { color: colors.text, fontSize: mainTextSize },
                styles.status,
              ]}
            >
              {data.status} - {data.species}
            </Text>
          </View>
        </View>
        <View style={styles.textPair}>
          <Text style={[styles.extraText, { fontSize: exrtaTextSize }]}>
            Type:{" "}
            <Text style={{ color: colors.text, fontSize: mainTextSize }}>
              {data.type || <Text>Without type</Text>}
            </Text>
          </Text>
          <Text style={[styles.extraText, { fontSize: exrtaTextSize }]}>
            Gender:{" "}
            <Text style={{ color: colors.text, fontSize: mainTextSize }}>
              {data.gender}
            </Text>
          </Text>
        </View>
        <View style={styles.textPair}>
          <Text style={[styles.extraText, { fontSize: exrtaTextSize }]}>
            From:
          </Text>
          <Text style={{ color: colors.text, fontSize: mainTextSize }}>
            {data.origin.name}
          </Text>
        </View>
        <View style={styles.textPair}>
          <Text style={[styles.extraText, { fontSize: exrtaTextSize }]}>
            Last known location:
          </Text>
          <Text style={{ color: colors.text, fontSize: mainTextSize }}>
            {data.location.name}
          </Text>
        </View>
        <View style={styles.textPair}>
          <Text style={[styles.extraText, { fontSize: exrtaTextSize }]}>
            First seen in:
          </Text>
          <Text style={{ color: colors.text, fontSize: mainTextSize }}>
            {firstEpisodeName}
          </Text>
        </View>
        <View style={styles.textPair}>
          <Text style={[styles.extraText, { fontSize: exrtaTextSize }]}>
            Created at:
          </Text>
          <Text style={{ color: colors.text, fontSize: mainTextSize }}>
            {data.created}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    alignItems: "flex-start",
  },
  image: {
    borderRadius: 16,
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
  extraText: {
    color: "#9e9e9e",
  },
});
