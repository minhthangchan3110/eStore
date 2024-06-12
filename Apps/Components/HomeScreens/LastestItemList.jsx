import { View, Text, FlatList } from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function LastestItemList({ latestItemList, heading }) {
  return (
    <View className="mt-2 w-full ">
      <Text className="font-bold text-xl">{heading}</Text>
      <FlatList
        data={latestItemList}
        horizontal
        renderItem={({ index, item }) => <PostItem item={item} />}
      />
    </View>
  );
}
