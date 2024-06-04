import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function PostItem({ item }) {
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice + "₫";
  };

  const formatDiscount = (discount) => {
    if (discount === undefined || discount === null) return "N/A";
    const formattedDiscount = discount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedDiscount + "₫";
  };

  //////

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.push("product-detail", { product: item })}
      className="flex-1 relative m-2 w-[150px] rounded-lg border-[1px] border-slate-200"
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[150px] rounded-lg"
      />
      <View className="gap-2 p-2">
        <Text
          ellipsizeMode="tail"
          className="text-sm font-bold mt-2 "
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View>
          <Text className="text-red-500 font-medium text-sm">
            {formatPrice(item.price)}
          </Text>
          <Text className="text-gray-400 line-through text-xs shadow-lg">
            {formatDiscount(item.discount)}
          </Text>
        </View>
      </View>
      <View className="absolute top-3 rounded-l-lg right-[-5px] bg-red-500 px-3 py-1">
        <Text className="text-white text-xs">{item.sale}%</Text>
      </View>
      <View className=" absolute w-0 h-0 top-[9px] right-[-5px]  border-l-[-2px] border-l-transparent border-b-[3px] border-b-red-500 border-r-[5px] shadow-sm border-r-transparent"></View>
      <View className=" flex-row justify-between items-center px-2 pb-2">
        <View className="flex flex-row">
          <Text className="text-xs font-medium text-yellow-400">4.5</Text>
          <Ionicons name="star" size={16} color="yellow" />
        </View>
        <View>
          <Text className="text-xs text-gray-500">(10 đánh giá)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
