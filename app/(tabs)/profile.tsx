import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function profile() {
    return(
        <View style={styles.container}>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" />
        
                <TextInput
                  placeholder="Pesquisar..."
                  placeholderTextColor="#999"
                  style={styles.input}
                />
              </View>
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