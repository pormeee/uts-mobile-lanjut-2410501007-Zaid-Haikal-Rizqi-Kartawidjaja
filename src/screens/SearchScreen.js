import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

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
        style={{ marginBottom: 15 }}
      >
        <Image
          source={{ uri: show.image?.medium }}
          style={{ width: "100%", height: 200 }}
        />
        <Text>{show.name}</Text>
        <Text>⭐ {show.rating?.average || "N/A"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder="Cari film..."
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button title="Search" onPress={handleSearch} />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}