import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";

import { getShows } from "../services/api";
import COLORS from "../constants/colors";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FILTER STATE
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Drama", "Comedy", "Action", "Thriller"];

  const fetchData = async () => {
    try {
      setError(null);
      const result = await getShows();
      setData(result);
    } catch (err) {
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    fetchData();
  };

  // FILTER LOGIC
  const filteredData =
    selectedGenre === "All"
      ? data
      : data.filter((item) =>
          item.genres && item.genres.includes(selectedGenre)
        );

  // Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Error
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", marginBottom: 10 }}>
          {error}
        </Text>

        <TouchableOpacity
          onPress={fetchData}
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Card
  const renderItem = ({ item }) => (
    <MovieCard
      item={item}
      onPress={() => navigation.navigate("Detail", { item })}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>

      {/* FILTER UI */}
      <View style={styles.filterContainer}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            onPress={() => setSelectedGenre(genre)}
            style={[
              styles.filterButton,
              selectedGenre === genre && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedGenre === genre && styles.activeText,
              ]}
            >
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData} //  pakai filtered
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // FILTER STYLE
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#ccc",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 12,
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
});
