import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
export default function Header() {
  const { user } = useUser();

  const navigation = useNavigation();
  const handleGoCart = () => {
    navigation.navigate("cart");
  };
  const [cartItemCount, setCartItemCount] = useState(0); // State để lưu số lượng sản phẩm trong giỏ hàng
  const cart = useSelector((state) => state.cart.cart); // Truy cập trạng thái giỏ hàng từ Redux Store

  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalItems);
  }, [cart]);
  return (
    <View>
      {/* User Info */}
      <View className="flex flex-row justify-between items-center gap-2">
        <View className="flex flex-row  items-center">
          <Image
            source={{ uri: user?.imageUrl }}
            className="rounded-full w-12 h-12 mr-2"
          />
          <View>
            <Text className="text-[15px]">Xin chào</Text>
            <Text className="text-[18px] font-bold">{user?.fullName}</Text>
          </View>
        </View>
        <View>
          <AntDesign
            onPress={handleGoCart}
            name="shoppingcart"
            size={24}
            color="black"
          />
          {cartItemCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -5,
                right: 10,
                backgroundColor: "red",
                borderRadius: 10,
                width: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-white text-xs">{cartItemCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Search Bar */}
      <View className="p-3 px-5 flex flex-row items-center bg-white mt-5 rounded-full border-pink-300 border-[2px]">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Tìm kiếm"
          className="ml-2"
          onChangeText={(value) => console.log(value)}
        />
      </View>
    </View>
  );
}
