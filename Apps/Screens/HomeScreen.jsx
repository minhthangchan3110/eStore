import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreens/Header";
import Slide from "../Components/HomeScreens/Slide";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Categories from "../Components/HomeScreens/Categories";
import LastestItemList from "../Components/HomeScreens/LastestItemList";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSlideList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loaItems, setLoaItems] = useState([]);
  const [appleItems, setAppleItems] = useState([]);

  useEffect(() => {
    getSliders();
    getCategory();
    getProductsByCategory("Loa", setLoaItems);
    getProductsByCategory("Apple", setAppleItems);
  }, []);

  const getSliders = async () => {
    setSlideList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSlideList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategory = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getProductsByCategory = async (category, setItems) => {
    setItems([]);
    const q = query(
      collection(db, "Products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setItems((items) => [...items, doc.data()]);
    });
  };

  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
      <Header />
      <Slide sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LastestItemList latestItemList={loaItems} heading="Loa" />
      <LastestItemList latestItemList={appleItems} heading="Apple" />
    </ScrollView>
  );
}
