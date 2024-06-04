import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function LastestItemList({ latestItemList, heading }) {
  return (
    <View className="mt-3 w-full">
      <Text className="font-bold text-xl">{heading}</Text>
      <FlatList
        data={latestItemList}
        horizontal
        renderItem={({ index, item }) => <PostItem item={item} />}
      />
    </View>
  );
}