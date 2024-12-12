import { useEffect, useState, useRef } from "react";
import { Alert, Modal, View, StatusBar, ScrollView } from "react-native";

import { useCameraPermissions, CameraView } from "expo-camera";
import { router, useLocalSearchParams, Redirect } from "expo-router";

import { api } from "@/services/api";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [isCouponFetching, setIsCouponFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();

  const qrLock = useRef(false);
  console.log(params.id);
  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Market", "Erro ao buscar dados do Market", [
        { text: "Ok", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Market", "Você precisa habilitar o uso da câmera");
      }

      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Câmera", "Não foi possível utilizar a câmera");
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsCouponFetching(true);

      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert("Cupom", `Cupom resgatado com sucesso: ${data.coupon}`);
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Cupom", "Erro ao buscar cupom");
    } finally {
      setIsCouponFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => { getCoupon(id); } },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />

        <Details data={data} />
      </ScrollView>

      {coupon && <Coupon code={coupon}></Coupon>}

      <View style={{ padding: 32 }}>
        <Button onPress={() => handleOpenCamera()}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              handleUseCoupon(data);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={isCouponFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
