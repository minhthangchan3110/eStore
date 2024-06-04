import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function CartScreen() {
  const [counter, setCounter] = useState(1);
  console.log(counter);
  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrementCounter = () => {
    setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
  };

  const route = useRoute();
  const [product, setProduct] = useState(null);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice + "₫";
  };

  useEffect(() => {
    if (route.params && route.params.product) {
      setProduct(route.params.product);
    }
  }, [route.params]);

  const handleInputChange = (value) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      setCounter(numberValue);
    } else {
      setCounter(0);
    }
  };

  return (
    <ScrollView className="w-full bg-white">
      <View className="w-full flex flex-row mx-2 mt-4">
        <View className="w-1/8">
          <FontAwesome name="map-marker" size={18} color="red" />
        </View>
        <View className="w-7/8 ml-4 flex flex-row items-center">
          <View className="w-11/12">
            <Text>Địa chỉ nhận hàng</Text>
            <Text>Minh Thắng | (+84) 356458854</Text>
            <Text>
              Ngõ 181 Nguyễn Trãi, Phường Thượng Đình, Quận Thanh Xuân, Hà Nội
            </Text>
          </View>
          <AntDesign name="right" size={14} color="grey" />
        </View>
      </View>
      <LinearGradient
        colors={["#6fa6d6", "transparent", "#f18d9b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-1 my-2"
      />
      {product && (
        <View className="w-full flex flex-row px-1">
          <View className="w-1/3 border-gray-300 rounded-lg border flex items-center">
            <Image
              source={{ uri: product.image }}
              className="w-[100px] h-[80px]"
            />
          </View>
          <View className="w-2/3 pl-2 flex flex-col justify-between">
            <Text className="w-full font-semibold">{product.name}</Text>
            <View className="flex flex-row items-end w-full justify-between">
              <Text className="text-red-500 w-1/2 font-medium text-base">
                {formatPrice(product.price)}
              </Text>
              <View className="flex flex-row w-1/2 items-center justify-around border rounded-xl">
                <TouchableOpacity onPress={decrementCounter}>
                  <AntDesign name="minus" size={14} color="black" />
                </TouchableOpacity>
                <TextInput
                  className="border-x text-center w-1/3"
                  keyboardType="numeric"
                  onChangeText={handleInputChange}
                  value={counter.toString()}
                />
                <TouchableOpacity onPress={incrementCounter}>
                  <FontAwesome6 name="add" size={14} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
