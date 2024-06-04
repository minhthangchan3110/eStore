import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LastestItemList from "../Components/HomeScreens/LastestItemList";
import { Dropdown } from "react-native-element-dropdown";
import ListItemCate from "../Components/HomeScreens/ListItemCate";

const dataPrice = [
  { label: "Mức giá", value: "" },
  { label: "149,000 - 499,000", value: "149000-499000" },
  { label: "500,000 - 2,000,000", value: "500000-2000000" },
];

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    params?.category || ""
  );

  const [typePrice, setTypePrice] = useState([]);
  const [valuePrice, setValuePrice] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(params?.price || "");
  useEffect(() => {
    if (selectedCategory) {
      getItemListByCategory();
    }

    if (selectedPrice) {
      getPriceItemByProduct();
    }
  }, [selectedCategory, selectedPrice]);

  const getItemListByCategory = async () => {
    setItemList([]);
    const q = query(
      collection(db, "Products"),
      where("category", "==", selectedCategory)
    );

    const [snapshot] = await Promise.all([getDocs(q)]);
    const items = [];

    snapshot.forEach((doc) => {
      items.push(doc.data());
    });

    setItemList(items);
  };

  const getPriceItemByProduct = async () => {
    setTypePrice([]);

    const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

    const q = query(
      collection(db, "Products"),
      where("price", ">=", minPrice),
      where("price", "<=", maxPrice)
    );

    const [snapshot] = await Promise.all([getDocs(q)]);
    const items = [];

    snapshot.forEach((doc) => {
      const productData = doc.data();
      if (productData.category === selectedCategory) {
        items.push(productData);
      }
    });

    setTypePrice(items);
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View className="flex-1 w-full flex-row px-2">
        <Dropdown
          className="p-5 h-[50px] w-full border pr-2 mt-2 border-gray-200 rounded-lg"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={dataPrice}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Mức giá"
          value={valuePrice}
          onChange={(item) => {
            const selectedValue = item.value;
            setValuePrice(selectedValue);
            setSelectedPrice(selectedValue);
          }}
        />
      </View>
      {selectedPrice && typePrice.length > 0 ? (
        <ListItemCate latestItemList={typePrice} heading="" />
      ) : itemList.length > 0 ? (
        <ListItemCate latestItemList={itemList} heading="" />
      ) : (
        <Text
          style={{
            padding: 20,
            fontSize: 18,
            textAlign: "center",
            color: "gray",
          }}
        >
          Không tìm thấy sản phẩm
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    opacity: 0.5,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
