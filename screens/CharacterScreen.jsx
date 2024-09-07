import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Text, View, StyleSheet, Image, Platform } from "react-native";
import { Loading } from "../components/Loading";

export default function CharacterScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [firstEpisodeName, setFirstEpisodeName] = useState("");
  const { id, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get("https://rickandmortyapi.com/api/character/" + id)
      .then(async ({ data }) => {
        setData(data);

        if (data.episode.length > 0) {
          const episodeResponse = await axios.get(data.episode[0]);
          setFirstEpisodeName(episodeResponse.data.name);
        } else {
          setFirstEpisodeName("Unknown episode");
        }
      })
      .catch((err) => {
        Alert.alert("Ошибка", "Не удалось получить персонажа");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `${data.image}` }} style={styles.image} />
      <View style={styles.textPair}>
        <Text style={styles.name}>{data.name}</Text>
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
          <Text style={[styles.mainText, styles.status]}>
            {data.status} - {data.species}
          </Text>
        </View>
      </View>
      <View style={styles.textPair}>
        <Text style={styles.extraText}>
          Type:{" "}
          <Text style={styles.mainText}>
            {data.type || <Text>Without type</Text>}
          </Text>
        </Text>
        <Text style={styles.extraText}>
          Gender: <Text style={styles.mainText}>{data.gender}</Text>
        </Text>
      </View>
      <View style={styles.textPair}>
        <Text style={styles.extraText}>From:</Text>
        <Text style={styles.mainText}>{data.origin.name}</Text>
      </View>
      <View style={styles.textPair}>
        <Text style={styles.extraText}>Last known location:</Text>
        <Text style={styles.mainText}>{data.location.name}</Text>
      </View>
      <View style={styles.textPair}>
        <Text style={styles.extraText}>First seen in:</Text>
        <Text style={styles.mainText}>{firstEpisodeName}</Text>
      </View>
      <View style={styles.textPair}>
        <Text style={styles.extraText}>Created at:</Text>
        <Text style={styles.mainText}>{data.created}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e2e",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    padding: 20,
    gap: 15,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 16,
  },
  name: {
    color: "white",
    fontSize: 30,
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
  mainText: {
    color: "#ffffff",
    fontSize: 18,
  },
  extraText: {
    color: "#9e9e9e",
    fontSize: 16,
  },
});
