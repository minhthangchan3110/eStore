import { View, Text, FlatList } from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function FavoriteCard({ data }) {
  return (
    <View style={{ marginTop: 3, width: "100%" }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <PostItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}
