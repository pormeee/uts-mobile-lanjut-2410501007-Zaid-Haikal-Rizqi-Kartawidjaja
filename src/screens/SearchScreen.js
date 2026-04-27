import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query || query.trim().length < 3) {
      setError("Minimal 3 karakter");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      const result = await response.json();

      setData(result);
    } catch (err) {
      setError("Gagal mencari data");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const show = item.show;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", {
            screen: "Detail",
            params: { item: show },
          })
        }
        style={styles.card}
      >
        <Image
          source={{
            uri:
              show.image?.medium ||
              "https://via.placeholder.com/300x200?text=No+Image",
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{show.name}</Text>
          <Text style={styles.rating}>
            ⭐ {show.rating?.average || "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ padding: 12 }}>

        <TextInput
          placeholder="Cari film..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {loading && <ActivityIndicator size="large" color={COLORS.primary} />}

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    color: COLORS.text,
  },
  rating: {
    color: COLORS.sub,
  },
});