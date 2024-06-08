import { View, Text, Image } from "react-native";
import React from "react";

export default function SaleOption() {
  return (
    <View className="bg-red-500 p-4 flex flex-col ">
      <View className="flex flex-row mb-2 items-center">
        <View className="w-1/4">
          <Image
            source={require("../../../assets/img/Banner/sale1.png")}
            className="w-full h-[20px]"
          />
        </View>
        <View className="w-1/4">
          <Image
            source={require("../../../assets/img/Banner/sale2.png")}
            className="w-full h-[20px]"
          />
        </View>
        <View className="w-1/4">
          <Image
            source={require("../../../assets/img/Banner/sale3.png")}
            className="w-full h-[20px]"
          />
        </View>
        <View className="w-1/4">
          <Image
            source={require("../../../assets/img/Banner/sale4.png")}
            className="w-full h-[20px]"
          />
        </View>
      </View>
      <View className="flex flex-row items-center">
        <View className="w-1/5">
          <Image
            source={require("../../../assets/img/Banner/sale5.png")}
            className="w-full h-[20px]"
          />
        </View>
        <View className="w-1/5">
          <Image
            source={require("../../../assets/img/Banner/sale6.png")}
            className="w-full h-[20px]"
          />
        </View>
        <View className="w-1/5">
          <Image
            source={require("../../../assets/img/Banner/sale7.png")}
            className="w-full h-[20px]"
          />
        </View>
        <View className="w-1/5">
          <Image
            source={require("../../../assets/img/Banner/sale8.png")}
            className="w-full h-[20px]"
          />
        </View>
        <View className="w-1/5">
          <Image
            source={require("../../../assets/img/Banner/sale9.png")}
            className="w-full h-[20px]"
          />
        </View>
      </View>
    </View>
  );
}
