import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const favoriteCities = [
  {
    id: 1,
    city: "Lisboa",
    country: "Portugal",
    description:
      "Baixa Pombalina, Mosteiro dos Jerónimos, Basílica da Estrela, MAAT, Torre de Belém, Casa do Alentejo, Fundação Champalimaud...",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
    favorite: true,
  },
  {
    id: 2,
    city: "Porto",
    country: "Portugal",
    description:
      "Ribeira, Ponte D. Luís I, Livraria Lello, Torre dos Clérigos, Palácio da Bolsa, Foz do Douro...",
    image:
      "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=800&q=80",
    favorite: true,
  }
];

export default function Favorites() {
  const [query, setQuery] = useState("");

  const filteredCities = useMemo(() => {
    if (!query.trim()) return favoriteCities;

    return favoriteCities.filter((item) =>
      `${item.city} ${item.country}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>Favoritos</Text>
      </View>

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

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCities.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>
                {item.city}, {item.country}
              </Text>

              <Text style={styles.cardDescription} numberOfLines={4}>
                {item.description}
              </Text>
            </View>

            <TouchableOpacity style={styles.heartButton}>
              <Ionicons name="heart-outline" size={30} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}

        {filteredCities.length === 0 && (
          <Text style={styles.emptyText}>
            Não foram encontradas cidades favoritas.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    padding: 30,
    paddingTop: 100,
  },

  titleCard: {
    backgroundColor: "#9D500C",
    borderRadius: 8,
    width: 143.5,
    height: 34,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },

  listContainer: {
    marginTop: 24,
  },

  listContent: {
    paddingBottom: 30,
    gap: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F5F0E8",
    borderWidth: 3,
    borderColor: "#111",
    borderRadius: 14,
    padding: 10,
    position: "relative",
  },

  cardImage: {
    width: 95,
    height: 95,
    borderWidth: 2,
    borderColor: "#111",
    marginRight: 14,
  },

  cardTextContainer: {
    flex: 1,
    paddingRight: 36,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#9D500C",
    fontWeight: "700",
  },

  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});