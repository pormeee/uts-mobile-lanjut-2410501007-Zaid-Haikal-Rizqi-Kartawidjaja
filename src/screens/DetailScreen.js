import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

export default function DetailScreen({ route }) {
  const { item } = route.params;

  const { dispatch, state } = useContext(FavoriteContext);

  const isFavorite = state.favorites.some(f => f.id === item.id);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Image
        source={{ uri: item.image?.original }}
        style={{ width: "100%", height: 300 }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {item.name}
      </Text>

      <Text>⭐ Rating: {item.rating?.average || "N/A"}</Text>
      <Text>🎭 Genre: {item.genres.join(", ")}</Text>
      <Text>📺 Status: {item.status}</Text>
      <Text>⏱ Runtime: {item.runtime} min</Text>

      <Text style={{ marginTop: 10 }}>📝 Summary:</Text>

      <Text>
        {item.summary?.replace(/<[^>]+>/g, "")}
      </Text>

      <TouchableOpacity
        disabled={isFavorite}
        onPress={() =>
          dispatch({ type: "ADD_FAVORITE", payload: item })
        }
        style={{
          backgroundColor: isFavorite ? "gray" : "blue",
          padding: 12,
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          {isFavorite ? "Sudah di Favorit" : "Tambah ke Favorit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}