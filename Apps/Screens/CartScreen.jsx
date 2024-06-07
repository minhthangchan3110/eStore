import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateQuantity,
} from "../../redux/cartReducer";
import CustomAlertCart from "../Components/Modal/CustomAlertCart";

export default function CartScreen() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    let total = 0;
    selectedItems.forEach((itemIndex) => {
      const item = cart[itemIndex];
      if (item) {
        total += item.price * item.quantity;
      }
    });
    setTotalPrice(total);
  }, [selectedItems, cart]);

  const handleBuyNow = () => {
    if (selectedItems.length === 0) {
      setAlertMessage("Vui lòng chọn sản phẩm");
      setAlertVisible(true);
    } else {
      const selectedProducts = selectedItems.map((index) => cart[index]);
      navigation.navigate("order", { products: selectedProducts });
    }
  };

  const toggleCheckbox = (index) => {
    const selectedIndex = selectedItems.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, index]);
    } else {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(selectedIndex, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };

  const incrementCounter = (item) => {
    dispatch(incrementQuantity({ name: item.name }));
  };

  const decrementCounter = (item) => {
    dispatch(decrementQuantity({ name: item.name }));
  };

  const handleInputChange = (value, item) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue > 0) {
      dispatch(updateQuantity({ name: item.name, quantity: numberValue }));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity }));
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice + "₫";
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({ name: item.name }));
  };

  return (
    <View className="flex-1">
      <ScrollView className="bg-white w-screen">
        {cart.map(
          (item, index) =>
            item && (
              <View
                key={index}
                className="w-11/12 flex flex-row items-center px-2 my-2"
              >
                <CheckBox
                  disabled={false}
                  value={selectedItems.includes(index)}
                  onValueChange={() => toggleCheckbox(index)}
                />
                <View className="w-1/3 border-gray-300 rounded-lg border flex items-center ml-2">
                  <Image
                    source={{ uri: item.image }}
                    className="w-[100px] h-[80px] rounded-lg"
                  />
                </View>
                <View className="w-2/3 pl-2 flex flex-col justify-between ">
                  <Text className="w-full font-semibold " numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View className="flex flex-row items-center w-full justify-between">
                    <Text className="text-red-500 mr-2 font-medium text-base">
                      {formatPrice(item.price)}
                    </Text>
                    <View className="flex flex-row w-1/2 items-center justify-around border rounded-xl">
                      <TouchableOpacity onPress={() => decrementCounter(item)}>
                        <AntDesign name="minus" size={14} color="black" />
                      </TouchableOpacity>
                      <TextInput
                        className="border-x text-center w-1/3"
                        keyboardType="numeric"
                        onChangeText={(value) => handleInputChange(value, item)}
                        value={item.quantity.toString()}
                      />
                      <TouchableOpacity onPress={() => incrementCounter(item)}>
                        <FontAwesome6 name="add" size={14} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                    <Text>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "gray",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
        }}
      >
        <View className="flex flex-row items-center gap-1">
          <Text className="">Tổng số tiền:</Text>
          <Text className="text-red-500 font-bold text-base">
            {formatPrice(totalPrice)}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleBuyNow}>
            <View className="rounded-lg p-3 bg-orange-600">
              <Text className="text-white text-center font-semibold ">
                Thanh toán
              </Text>
            </View>
          </TouchableOpacity>
          <CustomAlertCart
            visible={alertVisible}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </View>
    </View>
  );
}
