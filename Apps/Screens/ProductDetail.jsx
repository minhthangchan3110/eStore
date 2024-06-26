import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LastestItemList from "../Components/HomeScreens/LastestItemList";
import { Rating } from "react-native-ratings";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import CustomAlert from "../Components/Modal/CustomAlert";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../redux/favoritesReducer";

const windowWidth = Dimensions.get("window").width;

export default function ProductDetail({ item }) {
  const cart = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const addItemToCart = (item) => dispatch(addToCart(item));
  const addItemToFavorites = (item) => dispatch(addToFavorite(item));
  const removeItemFromFavorites = (item) => dispatch(removeFromFavorite(item));
  const { params } = useRoute();
  const [product, setProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [listItem, setListItem] = useState([]);
  const [reviews, setReviews] = useState([]);
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (params && params.product) {
      setProduct(params.product);
      getProductsByCategory(params.product.category, params.product.name);
      getReviews();
      checkIfFavorite(params.product);
    }
  }, [params]);

  const checkIfFavorite = (product) => {
    const favorite = favorites.some((fav) => fav.name === product.name);
    setIsFavorite(favorite);
  };

  const getReviews = async () => {
    try {
      const reviewsRef = collection(db, "Reviews");
      const q = query(
        reviewsRef,
        where("productName", "==", params.product.name)
      );
      const querySnapshot = await getDocs(q);
      const reviewsData = [];
      let totalRating = 0;

      querySnapshot.forEach((doc) => {
        const review = doc.data();

        review.rating = parseInt(review.rating);
        reviewsData.push(review);
        totalRating += review.rating;
        console.log(totalRating);
      });

      setReviews(reviewsData);
      setReviewCount(reviewsData.length);
      setAverageRating(
        reviewsData.length > 0 ? totalRating / reviewsData.length : 0
      );
    } catch (error) {
      console.error("Error fetching reviews: ", error);
      Alert.alert("Error", "Failed to fetch reviews.");
    }
  };

  const getProductsByCategory = async (category, currentProductName) => {
    setListItem([]);
    const q = query(
      collection(db, "Products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      const productData = doc.data();
      if (productData.name !== currentProductName) {
        products.push(productData);
      }
    });
    setListItem(products);
  };

  const renderPagerIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {Array.from(Array(3).keys()).map((index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: currentPage === index ? "#007AFF" : "#D3D3D3",
              },
            ]}
            onPress={() => setCurrentPage(index)}
          />
        ))}
      </View>
    );
  };

  const handleAddCart = () => {
    console.log("Product to be added to cart:", product);
    addItemToCart(product);
    setAlertVisible(true);
  };

  const handleBuyNow = () => {
    const productWithQuantity = { ...product, quantity: 1 };
    navigation.navigate("order", { products: [productWithQuantity] });
    console.log({ products: productWithQuantity });
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeItemFromFavorites(product);
    } else {
      addItemToFavorites(product);
    }
    setIsFavorite(!isFavorite);
    console.log("Toggled Favorite:", !isFavorite);
  };

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

  const renderFeatures = (features) => {
    if (!features) return null;
    return features.split(" - ").map((feature, index) => (
      <Text
        className="font-semibold text-base"
        key={index}
        style={styles.featureText}
      >
        - {feature.trim()}
      </Text>
    ));
  };

  const parseInformation = (information) => {
    if (!information) return {};
    const infoArray = information.split(";");
    const parsedInfo = {};
    infoArray.forEach((info) => {
      const [key, value] = info.split(":");
      parsedInfo[key.trim()] = value.trim();
    });
    return parsedInfo;
  };

  const parsedInformation = parseInformation(product.infomation);

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmitReview = async () => {
    try {
      if (rating === 0) {
        Alert.alert("Lỗi", "Vui lòng chọn số sao trước khi gửi đánh giá.");
        return;
      }

      if (comment.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập nhận xét trước khi gửi đánh giá.");
        return;
      }

      const reviewsRef = collection(db, "Reviews");
      await addDoc(reviewsRef, {
        productName: params.product.name,
        rating: rating,
        comment: comment,
      });

      setComment("");
      setRating(0);

      Alert.alert("Thành công", "Đánh giá đã được gửi.");
    } catch (error) {
      console.error("Error adding review: ", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi đánh giá.");
    }
  };

  return (
    <ScrollView className="bg-white w-full h-full">
      <View className="flex justify-center items-center">
        <PagerView
          className="relative border-b-blac400"
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(event) => setCurrentPage(event.nativeEvent.position)}
        >
          <View key="1">
            <Image source={{ uri: product.image }} style={styles.image} />
          </View>
          <View key="2">
            <Image source={{ uri: product.slider1 }} style={styles.image} />
          </View>
          <View key="3">
            <Image source={{ uri: product.slider2 }} style={styles.image} />
          </View>
        </PagerView>
        <View className="absolute bottom-3">{renderPagerIndicator()}</View>
      </View>
      <View className="w-full">
        <Text className="text-xl m-2 font-medium">{product.name}</Text>
        <View className="flex-row justify-between items-center px-2 pb-2">
          <View className="flex gap-2 items-center justify-center flex-row">
            <Text className="text-base font-medium text-yellow-400">
              {averageRating.toFixed(1)}
            </Text>
            <Ionicons name="star" size={18} color="yellow" />
          </View>
          <View className="flex flex-row gap-1 items-center justify-center">
            <Text className="text-normal text-gray-500">
              ({reviewCount} đánh giá)
            </Text>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              onPress={toggleFavorite}
              size={24}
              color="red"
            />
          </View>
        </View>
        <View className="flex flex-row mx-2 items-center px-2 gap-2 mb-2">
          <Text className="text-red-500 font-medium text-xl">
            {formatPrice(product.price)}
          </Text>
          <Text className="text-gray-400 line-through text-base shadow-lg">
            {formatDiscount(product.discount)}
          </Text>
          <View className="border-red-500 border rounded-lg py-1 px-2 ">
            <Text className="text-xs text-red-500">{product.sale}%</Text>
          </View>
        </View>
        <View className="flex flex-row w-full">
          <TouchableOpacity
            className="w-1/3 border-y flex justify-center items-center p-2 border-gray-300"
            onPress={handleAddCart}
          >
            <Feather name="shopping-cart" size={24} color="black" />
            <Text className="text-xs mt-1">Thêm vào giỏ</Text>
          </TouchableOpacity>
          <CustomAlert
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
          />
          <TouchableOpacity
            onPress={handleBuyNow}
            className="w-2/3 flex justify-center items-center bg-red-600 focus:bg-red-800"
          >
            <Text className="text-white text-center">Mua ngay</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-2 mt-2">
          <View className="flex flex-row item-center justify-start">
            <AntDesign name="check" size={24} color="green" />
            <Text className="ml-1 text-sm font-medium">
              Bảo hành chính hãng {product.guarantee} tháng.
            </Text>
          </View>
          <View className="flex flex-row item-center justify-start">
            <AntDesign name="check" size={24} color="green" />
            <Text className="ml-1 text-sm font-medium">
              Màu sắc: {product.color}
            </Text>
          </View>
          <View className="flex flex-row item-center justify-start">
            <AntDesign name="check" size={24} color="green" />
            <Text className="ml-1 text-sm font-medium">
              Thương hiệu: {product.firm}
            </Text>
          </View>
        </View>
        <View className="mx-2 mt-2">
          <Text className=" text-xl font-bold mb-2">TÍNH NĂNG NỔI BẬT</Text>
          {renderFeatures(product.feature)}
        </View>
        <View className="mx-2 mt-2">
          <Text className=" text-xl font-bold mb-2">THÔNG SỐ KỸ THUẬT</Text>
          {Object.entries(parsedInformation).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.cellTitle}>{key.replace(/"/g, "")}</Text>
              <Text style={styles.cell}>{value.replace(/"/g, "")}</Text>
            </View>
          ))}
        </View>
        <View className="mx-2 mb-2">
          <LastestItemList
            latestItemList={listItem}
            heading="SẢN PHẨM TƯƠNG TỰ"
          />
        </View>
      </View>
      <View className=" flex gap-1 mx-2">
        <Text className="text-lg font-bold">
          Đánh giá & Nhận xét {product.name}
        </Text>
        <Text className="text-lg font-semibold">{rating}/5</Text>
        <Rating
          className="flex items-start"
          type="star"
          ratingCount={5}
          startingValue={rating}
          imageSize={25}
          onFinishRating={handleRating}
        />
        <View className="border p-2 border-gray-400 rounded-lg">
          <TextInput
            className="h-[120px] justify-start"
            underlineColorAndroid="transparent"
            placeholder="Nhận xét về sản phẩm"
            placeholderTextColor="grey top-1"
            numberOfLines={10}
            multiline={true}
            textAlignVertical="top"
            value={comment}
            onChangeText={handleCommentChange}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmitReview}
          className="bg-red-500 py-2 rounded-lg mb-2"
        >
          <Text className="text-center text-white rounded-lg font-medium text-base">
            Gửi đánh giá
          </Text>
        </TouchableOpacity>
      </View>
      {reviews.map((review, index) => (
        <View className="mx-2 border my-1 rounded-lg p-2" key={index}>
          <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
          <Text style={styles.reviewComment}>Nhận xét: {review.comment}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    width: windowWidth,
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cellTitle: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
  },
  cell: {
    flex: 2,
    padding: 10,
  },
});
