import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Pesquisar..."
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          latitude: 38.7223,
          longitude: -9.1393,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: 38.7223, longitude: -9.1393 }} title="Lisboa" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    padding: 20,
  },
  map: {
    flex: 1
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginTop: 52,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});