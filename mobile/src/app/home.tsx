import { Alert, Text, View } from "react-native";

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, ListCategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView, { Callout, Marker } from "react-native-maps";

import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";

type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categories, setCategories] = useState<ListCategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get<ListCategoriesProps>("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Erro ao buscar categorias");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return;

      const { data } = await api.get<MarketProps[]>(
        `/markets/category/${category}`
      );
      setMarkets(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Locais", "Erro ao buscar locais");
    }
  }

  // async function getCurrentLocation(){
  //   try {
  //     const { granted } = await Location.requestForegroundPermissionsAsync()

  //     if(granted){
  //       const location = await Location.getCurrentPositionAsync()
  //       console.log(location)

  //     }
  //   } catch (error){
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        onSelect={setCategory}
        selected={category}
        data={categories}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  );
}
