import { Ionicons } from "@expo/vector-icons";
import polyline from "@mapbox/polyline";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const mapRef = useRef<MapView>(null);

  async function searchLocation() {
    if (!query) return;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=AIzaSyCjKzhQedjn747amZeg67ZJzI8FuJhI4tk`
    );

    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;

      mapRef.current?.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }

  function drawEncodedPolyline(encoded: string) {
    try {
      const points = polyline.decode(encoded);

      const coords = points.map(([latitude, longitude]) => ({
        latitude,
        longitude,
      }));

      setRouteCoords(coords);

      if (coords.length > 0) {
        mapRef.current?.fitToCoordinates(coords, {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
          animated: true,
        });
      }
    } catch (error) {
      console.log("Erro ao descodificar polyline:", error);
    }
  }

  useEffect(() => {
    const encodedPolyline = "{akkFhxyv@ai@he@YgURj{@";
    drawEncodedPolyline(encodedPolyline);
  }, []);

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
          onSubmitEditing={searchLocation}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: 38.7223,
            longitude: -9.1393,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: 38.7223, longitude: -9.1393 }}
            title="Lisboa"
          />

          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor="#1E90FF"
            />
          )}
        </MapView>
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
   mapContainer: {
    width: "100%",
    height: 240,
    borderWidth: 2,
    borderColor: "#2B1A12",
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 17,
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