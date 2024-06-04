import { View, Text, FlatList, Image } from "react-native";
import React from "react";

export default function Slide({ sliderList }) {
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              className="w-[300px] h-[200px] mr-3 rounded-lg object-contain"
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
