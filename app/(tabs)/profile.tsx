import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = [
  { id: 1, title: "Notificações", icon: "notifications-outline" },
  { id: 2, title: "Subscrição", icon: "card-outline" },
  { id: 3, title: "Idioma", icon: "language-outline" },
  { id: 4, title: "Termos e Condições", icon: "document-text-outline" },
  { id: 5, title: "Pagamento", icon: "wallet-outline" },
  { id: 6, title: "Histórico", icon: "time-outline" },
  { id: 7, title: "Permissões", icon: "shield-checkmark-outline" },
  { id: 8, title: "Ajuda", icon: "help-circle-outline" },
  { id: 9, title: "Terminar Sessão", icon: "close-circle-outline" },
];

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <View>
        {options.map((item) => (
          <TouchableOpacity key={item.id} style={styles.option}>
            <View style={styles.leftContent}>
              <Ionicons name={item.icon as any} size={30} color="#2B1A12" />
              <Text style={styles.optionText}>{item.title}</Text>
            </View>

            {/* <Ionicons name="chevron-forward" size={20} color="#7A6A5F" /> */}
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    padding: 30,
    paddingTop: 100
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

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  optionText: {
    fontSize: 17,
    color: "#9D500C",
    fontWeight: "800",
  },
});