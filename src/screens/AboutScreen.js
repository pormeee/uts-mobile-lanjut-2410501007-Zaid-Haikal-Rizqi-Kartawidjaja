import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/foto_saya.jpeg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Zaid Haikal Rizqi Kartawidjaja</Text>
          <Text style={styles.subtitle}>Mahasiswa Sistem Informasi</Text>
        </View>

        {/* INFO CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi</Text>
          <Text style={styles.info}>NIM: 2410501007</Text>
          <Text style={styles.info}>Kelas: B</Text>
          <Text style={styles.info}>Tema: MovieDex</Text>
        </View>

        {/* DESKRIPSI */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
          <Text style={styles.desc}>
            MovieDex adalah aplikasi untuk mencari dan melihat informasi film
            menggunakan TVMaze API. Aplikasi ini juga menyediakan fitur favorit
            dan pencarian.
          </Text>
        </View>

        <Text style={styles.credit}>Powered by TVMaze API</Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    padding: 16,
  },

  // HEADER
  header: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    color: "#ddd",
    fontSize: 14,
  },

  // CARD
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },

  info: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 2,
  },

  desc: {
    color: "#444",
    lineHeight: 20,
  },

  credit: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
    fontSize: 13,
  },
});