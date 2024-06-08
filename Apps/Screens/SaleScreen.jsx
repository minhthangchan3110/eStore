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
import ListItemCate from "../Components/HomeScreens/ListItemCate";

export default function SaleScreen() {
  const db = getFirestore(app);
  const [loaItems, setLoaItems] = useState([]);
  const [appleItems, setAppleItems] = useState([]);

  useEffect(() => {
    getProductsByCategory("Loa", setLoaItems);
    getProductsByCategory("Apple", setAppleItems);
  }, []);

  const getProductsByCategory = async (category, setItems) => {
    try {
      setItems([]);
      const q = query(
        collection(db, "Products"),
        where("category", "==", category),
        where("sale", ">", 20)
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
        <LastestItemList latestItemList={loaItems} />
      </View>
    </ScrollView>
  );
}
