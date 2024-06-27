import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import SaleOption from "../Components/SaleScreen/SaleOption";
import LastestItemList from "../Components/HomeScreens/LastestItemList";

export default function SaleScreen() {
  const db = getFirestore(app);
  const [screenItems, setScreenItems] = useState([]);
  const [mouseItems, setMouseItems] = useState([]);
  const [keyboardItems, setKeyboardItems] = useState([]);
  const [laptopItems, setLaptopItems] = useState([]);
  const [pcItems, setPCItems] = useState([]);
  const [headphoneItems, setHeadphoneItems] = useState([]);
  const [charItems, setCharItems] = useState([]);

  useEffect(() => {
    getProductsByCategory("Màn hình", setScreenItems);
    getProductsByCategory("Chuột", setMouseItems);
    getProductsByCategory("Bàn phím", setKeyboardItems);
    getProductsByCategory("Laptop", setLaptopItems);
    getProductsByCategory("PC", setPCItems);
    getProductsByCategory("Tai nghe", setHeadphoneItems);
    getProductsByCategory("Ghế", setCharItems);
  }, []);

  const getProductsByCategory = async (category, setItems) => {
    try {
      setItems([]);
      const q = query(
        collection(db, "Products"),
        where("category", "==", category),
        where("sale", ">", 1)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setItems((items) => [...items, doc.data()]);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  return (
    <ScrollView className="w-full">
      <View className="bg-yellow-200 pt-2">
        <Image
          source={require("./../../assets/img/titlebanner.png")}
          className="w-full h-[70px] -bottom-1"
        />
      </View>
      <View className="w-full px-2 bg-yellow-200 mt-5 relative">
        <Image
          source={require("./../../assets/img/hotbanner1.png")}
          className="w-full h-[150px] -top-5"
        />
      </View>
      <SaleOption />
      <View className="w-full flex items-center bg-yellow-200">
        <Image
          source={require("../../assets/img/Banner/screen.png")}
          className="w-3/4 h-14"
        />
        <LastestItemList latestItemList={screenItems} />
      </View>
      <View className="w-full flex items-center bg-yellow-200">
        <Image
          source={require("../../assets/img/Banner/mouse.png")}
          className="w-3/4 h-14"
        />
        <LastestItemList latestItemList={mouseItems} />
      </View>
      <View className="w-full flex items-center bg-yellow-200">
        <Image
          source={require("../../assets/img/Banner/bp.png")}
          className="w-3/4 h-14"
        />
        <LastestItemList latestItemList={keyboardItems} />
      </View>
      <View className="w-full flex items-center bg-yellow-200">
        <Image
          source={require("../../assets/img/Banner/laptop.png")}
          className="w-3/4 h-14"
        />
        <LastestItemList latestItemList={laptopItems} />
      </View>
      <View className="w-full flex items-center bg-yellow-200">
        <Image
          source={require("../../assets/img/Banner/headphone.png")}
          className="w-3/4 h-14"
        />
        <LastestItemList latestItemList={headphoneItems} />
      </View>
      <View className="w-full flex items-center bg-yellow-200">
        <Image
          source={require("../../assets/img/Banner/mouse.png")}
          className="w-3/4 h-14"
        />
        <LastestItemList latestItemList={headphoneItems} />
      </View>
      <View className="w-full flex items-center bg-yellow-200">
        <Image
          source={require("../../assets/img/Banner/char.png")}
          className="w-3/4 h-14"
        />
        <LastestItemList latestItemList={charItems} />
      </View>
    </ScrollView>
  );
}
