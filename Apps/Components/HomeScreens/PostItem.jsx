import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
export default function PostItem({ item }) {
  const navigation = useNavigation();
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice + "₫";
  };

  const formatDiscount = (discount) => {
    if (discount === undefined || discount === null) return "N/A";
    const formattedDiscount = discount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedDiscount + "₫";
  };
  const [reviews, setReviews] = useState([]);
  const db = getFirestore(app);

  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = async () => {
    try {
      const reviewsRef = collection(db, "Reviews");
      const q = query(reviewsRef, where("productName", "==", item.name));
      const querySnapshot = await getDocs(q);
      const reviewsData = [];
      let totalRating = 0;

      querySnapshot.forEach((doc) => {
        const review = doc.data();
        review.rating = parseInt(review.rating);
        reviewsData.push(review);
        totalRating += review.rating;
      });

      setReviews(reviewsData);
      setReviewCount(reviewsData.length);
      setAverageRating(
        reviewsData.length > 0 ? totalRating / reviewsData.length : 0
      );
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.push("product-detail", { product: item })}
      className="flex-1 bg-white relative m-2 w-[150px] rounded-lg border-[1px] border-slate-200"
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[150px] rounded-lg"
      />
      <View className="gap-2 p-2">
        <Text
          ellipsizeMode="tail"
          className="text-sm font-bold mt-2 "
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View>
          <Text className="text-red-500 font-medium text-sm">
            {formatPrice(item.price)}
          </Text>
          <Text className="text-gray-400 line-through text-xs shadow-lg">
            {formatDiscount(item.discount)}
          </Text>
        </View>
      </View>
      <View className="absolute top-3 rounded-l-lg right-[-5px] bg-red-500 px-3 py-1">
        <Text className="text-white text-xs">{item.sale}%</Text>
      </View>
      <View className=" absolute w-0 h-0 top-[9px] right-[-5px]  border-l-[-2px] border-l-transparent border-b-[3px] border-b-red-500 border-r-[5px] shadow-sm border-r-transparent"></View>
      <View className=" flex-row justify-between items-center px-2 pb-2">
        <View className="flex flex-row">
          <Text className="text-xs font-medium text-yellow-400">
            {" "}
            {averageRating.toFixed(1)}
          </Text>
          <Ionicons name="star" size={16} color="yellow" />
        </View>
        <View>
          <Text className="text-xs text-gray-500">
            ({reviewCount} đánh giá)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
