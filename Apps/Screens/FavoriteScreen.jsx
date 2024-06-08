import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function FavoriteScreen() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const toggleDropdown = (tab) => {
    setShowDropdown(!showDropdown);
    setSelectedTab(tab);
  };

  const dropdownData = [
    { key: "1", label: "Loại 1" },
    { key: "2", label: "Loại 2" },
    { key: "3", label: "Loại 3" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleTabPress(item.label);
        toggleDropdown();
      }}
      style={{
        padding: 10,
        backgroundColor: selectedTab === item.label ? "#f0f0f0" : "white",
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView className="w-full bg-white">
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
      {showDropdown && (
        <FlatList
          data={dropdownData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          style={{
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 5,
            backgroundColor: "#fff",
            elevation: 3,
            maxHeight: 150,
          }}
        />
      )}
    </ScrollView>
  );
}
