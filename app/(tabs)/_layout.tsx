import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,

        // opcional: mantém o teu botão com haptic
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home-outline" iconFocused="home" />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="chatbubble-outline"
              iconFocused="chatbubble"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="heart-outline" iconFocused="heart" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="person-outline" iconFocused="person" />
          ),
        }}
      />
    </Tabs>
  );
}

// ✅ Ícone com “badge”/realce quando está ativo (parecido à imagem)
function TabIcon({
  focused,
  icon,
  iconFocused,
}: {
  focused: boolean;
  icon: any;
  iconFocused: any;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons
        name={focused ? iconFocused : icon}
        size={22}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#F5F0E8",
    height: 72,
    paddingBottom: 10,
    paddingTop: 10,
    paddingInline: 62,
    borderTopWidth: 0,
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#000"
  },

  iconWrapActive: {
    backgroundColor: "#9D500C",
  },
});