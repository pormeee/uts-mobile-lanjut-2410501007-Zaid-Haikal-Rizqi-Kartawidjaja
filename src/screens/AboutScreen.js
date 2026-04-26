import { View, Text, Image } from "react-native";

export default function AboutScreen() {
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Image
        source={require("../../assets/foto_saya.jpeg")}
        style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 15 }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Nama: Zaid Haikal Rizqi Kartawidjaja
      </Text>

      <Text>NIM: 2410501007</Text>
      <Text>Kelas: B</Text>
      <Text>Tema: MovieDex</Text>

      <Text style={{ marginTop: 20 }}>
        Credit API: TVMaze API
      </Text>
    </View>
  );
}