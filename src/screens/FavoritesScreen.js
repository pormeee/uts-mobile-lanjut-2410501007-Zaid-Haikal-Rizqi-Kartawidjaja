import { useContext } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function FavoritesScreen() {
  const { state, dispatch } = useContext(FavoriteContext);

  return (
    <FlatList
      data={state.favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <Text>{item.name}</Text>
          <Button
            title="Hapus"
            onPress={() =>
              dispatch({ type: "REMOVE_FAVORITE", payload: item.id })
            }
          />
        </View>
      )}
    />
  );
}