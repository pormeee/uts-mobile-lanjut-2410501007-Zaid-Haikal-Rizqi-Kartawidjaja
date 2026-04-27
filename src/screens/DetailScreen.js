import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import COLORS from "../constants/colors";

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const { dispatch, state } = useContext(FavoriteContext);

  const isFavorite = state.favorites.some(f => f.id === item.id);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HERO IMAGE + OVERLAY */}
        <View style={styles.hero}>
          <Image
            source={{ uri: item.image?.original }}
            style={{ width: "100%", height: 300 }}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.overlay}
          />
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>{item.name}</Text>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* BADGES */}
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                ⭐ {item.rating?.average || "N/A"}
              </Text>
            </View>

            {item.genres?.slice(0, 2).map((g, i) => (
              <View key={i} style={styles.badge}>
                <Text style={styles.badgeText}>{g}</Text>
              </View>
            ))}

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
          </View>

          {/* SUMMARY CARD */}
          <View style={styles.card}>
            <Text style={styles.section}>Summary</Text>
            <Text style={styles.desc}>
              {item.summary?.replace(/<[^>]+>/g, "")}
            </Text>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            disabled={isFavorite}
            onPress={() =>
              dispatch({ type: "ADD_FAVORITE", payload: item })
            }
            style={[
              styles.button,
              { backgroundColor: isFavorite ? "#9ca3af" : COLORS.primary },
            ]}
          >
            <Text style={styles.buttonText}>
              {isFavorite ? "✓ Sudah di Favorit" : "❤️ Tambah ke Favorit"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  // HERO
  hero: {
    height: 320,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  heroTextWrap: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  // CONTENT
  container: {
    padding: 16,
  },

  // BADGES
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.text,
  },

  // 📝 CARD
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  section: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  desc: {
    color: "#444",
    lineHeight: 20,
  },

  // ❤️ BUTTON
  button: {
    padding: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});