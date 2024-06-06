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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function OrderScreen() {
  // const [counter, setCounter] = useState(1);
  // console.log(counter);
  // const incrementCounter = () => {
  //   setCounter((prevCounter) => prevCounter + 1);
  // };

  // const decrementCounter = () => {
  //   setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
  // };

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

  // const handleInputChange = (value) => {
  //   const numberValue = parseInt(value, 10);
  //   if (!isNaN(numberValue)) {
  //     setCounter(numberValue);
  //   } else {
  //     setCounter(0);
  //   }
  // };

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
        className="w-full h-1 my-4"
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
            <View className="flex flex-row items-center w-full">
              <Text className="text-red-500 mr-2 font-medium text-base">
                {formatPrice(product.price)}
              </Text>
              {/* <View className="flex flex-row w-1/2 items-center justify-around border rounded-xl">
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
              </View> */}
              <View>
                <Text className="text-gray-500">x1</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      <View className="flex my-2 p-2 border-gray-300 flex-row w-full border-y items-center">
        <Text className="w-1/4">Tin nhắn: </Text>
        <TextInput
          className=" w-3/4 text-right "
          placeholder="Để lại lưu ý..."
        ></TextInput>
      </View>
      {product && (
        <View className="flex flex-row justify-between pb-4 pt-2 px-2 border-gray-300 border-b">
          <Text>Thành tiền (1 sản phẩm):</Text>
          <Text className="text-red-500">{formatPrice(product.price)}</Text>
        </View>
      )}
      <LinearGradient
        colors={["#6fa6d6", "transparent", "#f18d9b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-1"
      />
      <View className=" border-y border-gray-300 flex flex-row justify-between py-4 px-2">
        <View className="flex flex-row items-center gap-1">
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color="red"
          />
          <Text>Sử dụng mã giảm giá: </Text>
        </View>
        <TouchableOpacity className="flex gap-1 flex-row items-center">
          <Text className="text-gray-500">Chọn Voucher</Text>
          <AntDesign name="right" size={18} color="gray" />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["#f18d9b", "#6fa6d6", "transparent", "#6fa6d6", "#f18d9b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-1"
      />
      <View className="border-y border-gray-300 flex flex-row justify-between py-4 px-2">
        <View className="flex flex-row  items-center gap-1">
          <FontAwesome5 name="coins" size={18} color="yellow" />
          <Text className="text-xs text-gray-500">Phương thức thanh toán:</Text>
        </View>
        <View className=" flex flex-row items-center gap-1">
          <Text className="text-xs text-gray-500">
            Thanh toán khi nhận hàng
          </Text>
          <AntDesign name="right" size={18} color="gray" />
        </View>
      </View>
      <View className="p-2 ">
        <View className="flex flex-row gap-2 items-center mb-2">
          <FontAwesome5 name="clipboard-list" size={18} color="orange" />
          <Text className="text-base">Chi tiết thanh toán</Text>
        </View>
        <View className="flex gap-2">
          <View className="flex flex-row justify-between">
            <Text className="text-gray-500">Tổng tiền hàng:</Text>
            <Text className="text-gray-500">1,690,000₫</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-gray-500">Phí vận chuyển:</Text>
            <Text className="text-gray-500">15,000₫</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-base">Thành tiền:</Text>
            <Text className="text-base text-red-500">1,705,000₫</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity className="w-[11/12] mt-2 bg-red-500 mx-2 rounded-lg p-2">
        <Text className="text-center text-lg text-white">ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
