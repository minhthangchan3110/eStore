// Trong ListItemCate.jsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import PostItem from "./PostItem";

export default function ListItemCate({ latestItemList, heading }) {
  return (
    <View style={{ marginTop: 3, width: "100%" }}>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
