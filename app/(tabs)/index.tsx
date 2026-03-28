import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

  // function drawEncodedPolyline(encoded: string) {
  //   try {
  //     const points = polyline.decode(encoded);

  //     const coords = points.map(([latitude, longitude]) => ({
  //       latitude,
  //       longitude,
  //     }));

  //     setRouteCoords(coords);

  //     if (coords.length > 0) {
  //       mapRef.current?.fitToCoordinates(coords, {
  //         edgePadding: {
  //           top: 50,
  //           right: 50,
  //           bottom: 50,
  //           left: 50,
  //         },
  //         animated: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Erro ao descodificar polyline:", error);
  //   }
  // }

  // useEffect(() => {
  //   const encodedPolyline = "{akkFhxyv@ai@he@YgURj{@";
  //   drawEncodedPolyline(encodedPolyline);
  // }, []);

  const [recentSearches, setRecentSearches] = useState([
    { id: '1', location: 'Lisboa, Portugal', interest: 'Arquitetura' },
    { id: '2', location: 'New York, USA', interest: 'Desporto' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
          <Text style={styles.title}>Pesquisas recentes</Text>
      </View>

      <View style={styles.recentContainer}>
        <FlatList
          data={recentSearches}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.chip}>
              <Ionicons name="refresh" size={25} color="#333" />

              <View style={{marginHorizontal: 6}}>
                <Text style={styles.chipTitle}>{item.location}</Text>
                <Text style={styles.chipSubtitle}>
                  Interesse: {item.interest}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                    setRecentSearches(prev =>
                      prev.filter(i => i.id !== item.id)
                    )
                  }
              >
                <Ionicons name="close" size={16} color="#333" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

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

      <View style={styles.titleCard}>
          <Text style={styles.title}>Mais Populares</Text>
      </View>

      <View>
        <Text style={styles.categoryTitle}>Arquitetura</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          <TouchableOpacity style={styles.popularCard}>
            <Image
              source={{ uri: 'https://picsum.photos/200/200?1' }}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Lisboa, Portugal</Text>
              <Text style={styles.cardDescription} numberOfLines={4}>
                Baixa Pombalina, Mosteiro dos Jerónimos, Basílica da Estrela,
                MAAT, Torre Belém, Casa do Alentejo, Fundação Champalimaud...
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.popularCard}>
            <Image
              source={{ uri: 'https://picsum.photos/200/200?2' }}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Barcelona, Espanha</Text>
              <Text style={styles.cardDescription} numberOfLines={4}>
                Sagrada Família, Casa Batlló, Palau de la Música, Plaça de Rey,
                Catedral de Barcelona...
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.categoryTitle}>História</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          <TouchableOpacity style={styles.popularCard}>
            <Image
              source={{ uri: 'https://picsum.photos/200/200?3' }}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Atenas, Grécia</Text>
              <Text style={styles.cardDescription} numberOfLines={4}>
                Acrópole, Parténon, Ágora Antiga, Museu Arqueológico Nacional...
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.popularCard}>
            <Image
              source={{ uri: 'https://picsum.photos/200/200?4' }}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Berlim, Alemanha</Text>
              <Text style={styles.cardDescription} numberOfLines={4}>
                Muro de Berlim, Portão de Brandemburgo, Reichstag, Checkpoint Charlie...
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    padding: 30,
    paddingTop: 50
  },
  map: {
    flex: 1
  },
   mapContainer: {
    width: "100%",
    height: 240,
    borderWidth: 3,
    borderColor: "#2B1A12",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 17,
    marginBottom: 25,
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
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  titleCard: {
    backgroundColor: "#9D500C",
    borderRadius: 8,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  recentContainer: {
    marginBottom: 20,
    marginTop: 30
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#000',
  },

  chipTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#9D500C'
  },

  chipSubtitle: {
    fontSize: 11,
    color: '#9D500C',
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    marginTop: 10,
  },

  cardsRow: {
    paddingBottom: 8,
  },

  popularCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 230,
    height: 90,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
  },

  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 4,
    marginRight: 8,
  },

  cardTextContainer: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A55400',
    lineHeight: 16,
  },
});