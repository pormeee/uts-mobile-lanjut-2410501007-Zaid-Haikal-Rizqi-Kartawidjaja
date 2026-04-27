import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default function MovieCard({ item, onPress, showDelete, onDelete }) {
  // 🔥 normalize data (biar bisa dipakai di Home & Search)
  const data = item?.show ? item.show : item;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.85}>
      <Image
        source={{
          uri:
            data.image?.medium ||
            "https://via.placeholder.com/300x200?text=No+Image",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {data.name}
        </Text>

        <Text style={styles.rating}>
          ⭐ {data.rating?.average || "N/A"}
        </Text>

        {/* Optional tombol hapus (buat Favorites) */}
        {showDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.button}>
            <Text style={styles.buttonText}>Hapus</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
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
});