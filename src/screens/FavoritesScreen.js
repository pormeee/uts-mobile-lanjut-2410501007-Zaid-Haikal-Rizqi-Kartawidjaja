import { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import MovieCard from "../components/MovieCard";

export default function FavoritesScreen({ navigation }) {
  const { state, dispatch } = useContext(FavoriteContext);

  const renderItem = ({ item }) => (
    <MovieCard
      item={item}
      onPress={() =>
        navigation.navigate("Home", {
          screen: "Detail",
          params: { item },
        })
      }
      showDelete
      onDelete={() =>
        dispatch({ type: "REMOVE_FAVORITE", payload: item.id })
      }
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {state.favorites.length === 0 ? (
        <Text style={styles.empty}>Belum ada favorit 😢</Text>
      ) : (
        <FlatList
          data={state.favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  rating: {
    marginTop: 4,
    color: COLORS.sub,
  },
  button: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "gray",
  },
});