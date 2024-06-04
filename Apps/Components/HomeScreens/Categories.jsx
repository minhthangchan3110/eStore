import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categoryList }) {
  const navigation = useNavigation();
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("item-list", { category: item.name })
            }
            className="flex-1 items-center m-1 w-[80px] h-[80px] rounded-xl border-pink-200 border-2 p-2 justify-center"
          >
            <View className="w-full h-full m-2 ">
              <View className="w-full h-[50px]">
                <Image
                  source={{ uri: item?.image }}
                  className=" w-full h-full rounded-xl border-pink-200"
                />
              </View>
              <Text className="w-full h-1/3 text-center mb-1">{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
