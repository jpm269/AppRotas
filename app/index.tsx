import { getToken } from "@/src/auth/session";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [dest, setDest] = useState<"/login" | "/(tabs)" | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setDest(token ? "/(tabs)" : "/login");
    })();
  }, []);

  if (!dest) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={dest} />;
}