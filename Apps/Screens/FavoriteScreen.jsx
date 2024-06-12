import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import FavoriteCard from "../Components/HomeScreens/FavoriteCard";

export default function FavoriteScreen({ item }) {
  const favorites = useSelector((state) => state.favorites.favorites);
  console.log(favorites);

  const [selectedTab, setSelectedTab] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const toggleDropdown = (tab) => {
    setShowDropdown(!showDropdown);
    setSelectedTab(tab);
  };

  return (
    <ScrollView className="w-full bg-white h-screen">
      <View className="bg-orange-500 p-2">
        <Text className="text-center text-white text-lg font-bold mt-5">
          Yêu thích
        </Text>
      </View>
      <View className="flex flex-row px-2 w-full gap-1 mt-2 justify-center items-center">
        <TouchableOpacity
          className={`w-1/3 border px-1 py-2 ${
            selectedTab === "all" ? "border-red-500" : ""
          }`}
          onPress={() => handleTabPress("all")}
        >
          <Text
            className={`text-center ${
              selectedTab === "all" ? "text-red-500" : ""
            }`}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-1/3 border px-1 py-2 ${
            selectedTab === "status" ? "border-red-500" : ""
          }`}
          onPress={() => handleTabPress("status")}
        >
          <Text
            className={`text-center ${
              selectedTab === "status" ? "text-red-500" : ""
            }`}
          >
            Trạng thái
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-1/3 flex flex-row justify-center items-center border px-1 py-2 ${
            selectedTab === "productType" ? "border-red-500" : ""
          }`}
          onPress={() => toggleDropdown("productType")}
        >
          <Text
            className={`text-center mr-1 ${
              selectedTab === "productType" ? "text-red-500" : ""
            }`}
          >
            Loại
          </Text>
          <AntDesign
            name="down"
            style={{
              color: selectedTab === "productType" ? "red" : "black",
              transform:
                selectedTab === "productType"
                  ? "rotate(180deg)"
                  : "rotate(360deg)",
            }}
            size={15}
          />
        </TouchableOpacity>
      </View>
      <FavoriteCard data={favorites} />
    </ScrollView>
  );
}
