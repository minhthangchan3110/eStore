import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import ListItemCate from "../Components/HomeScreens/ListItemCate";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import laptopFilter from "../../data/dataFilter";
import ramFilter from "../../data/dataFilterRam";
import FilterOptions from "../Components/Modal/Filter/FilterOption";
import { Ionicons } from "@expo/vector-icons";
import speakerFilter from "../../data/dataFilterLoa";

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubModalVisible, setSubModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    params?.category || ""
  );

  const [selectedPrice, setSelectedPrice] = useState(params?.price || "");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedLaptopOptions, setSelectedLaptopOptions] = useState({});
  const [selectedRamOptions, setSelectedRamOptions] = useState({});
  const [selectedSpeakerOptions, setSelectedSpeakerOptions] = useState({});

  useEffect(() => {
    if (selectedCategory) {
      getItemListByCategory();
    }

    getCategory();
  }, [selectedCategory]);

  const getCategory = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getItemListByCategory = async () => {
    setItemList([]);
    const q = query(
      collection(db, "Products"),
      where("category", "==", selectedCategory)
    );

    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => doc.data());
    setItemList(items);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openSubModal = (category) => {
    setSelectedSubCategory(category);
    setSubModalVisible(true);
  };

  const closeSubModal = () => {
    setSubModalVisible(false);
    setSelectedSubCategory(null);
  };

  const renderLaptopFilterOptions = () => {
    return laptopFilter.map((filter, index) => (
      <FilterOptions
        key={index}
        title={filter.title}
        options={filter.options}
        onSelectOption={(option) => {
          setSelectedLaptopOptions({
            ...selectedLaptopOptions,
            [filter.title]: option,
          });
        }}
      />
    ));
  };

  const renderRamFilterOptions = () => {
    return ramFilter.map((filter, index) => (
      <FilterOptions
        key={index}
        title={filter.title}
        options={filter.options}
        onSelectOption={(option) => {
          setSelectedRamOptions({
            ...selectedRamOptions,
            [filter.title]: option,
          });
        }}
      />
    ));
  };
  const renderSpeadkerFilterOptions = () => {
    return speakerFilter.map((filter, index) => (
      <FilterOptions
        key={index}
        title={filter.title}
        options={filter.options}
        onSelectOption={(option) => {
          setSelectedSpeakerOptions({
            ...selectedSpeakerOptions,
            [filter.title]: option,
          });
        }}
      />
    ));
  };

  const handleApplyFilters = () => {
    if (selectedSubCategory?.name.includes("Laptop")) {
      const filteredItems = itemList.filter((item) => {
        console.log("Selected Laptop Options:", selectedLaptopOptions);
        console.log("Item being compared:", item);

        let isMatch = true;
        for (const key in selectedLaptopOptions) {
          if (selectedLaptopOptions.hasOwnProperty(key)) {
            if (key === "CPU") {
              if (
                !item.hasOwnProperty("CPU") ||
                item["CPU"] !== selectedLaptopOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Hãng") {
              if (
                !item.hasOwnProperty("firm") ||
                item["firm"] !== selectedLaptopOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Kích thước màn hình") {
              if (
                !item.hasOwnProperty("screenSize") ||
                item["screenSize"] !== selectedLaptopOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Nhu cầu sử dụng") {
              if (
                !item.hasOwnProperty("usage") ||
                item["usage"] !== selectedLaptopOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "RAM") {
              if (
                !item.hasOwnProperty("RAM") ||
                item["RAM"] !== selectedLaptopOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "SSD") {
              if (
                !item.hasOwnProperty("SSD") ||
                item["SSD"] !== selectedLaptopOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "VGA") {
              if (
                !item.hasOwnProperty("VGA") ||
                item["VGA"] !== selectedLaptopOptions[key]
              ) {
                isMatch = false;
                break;
              }
            }
          }
        }

        return isMatch;
      });

      console.log("Filtered Laptop Items:", filteredItems);
      setItemList(filteredItems);
    }

    if (selectedSubCategory?.name.includes("RAM")) {
      const filteredItems = itemList.filter((item) => {
        console.log("Selected Laptop Options:", selectedRamOptions);
        console.log("Item being compared:", item);

        let isMatch = true;
        for (const key in selectedRamOptions) {
          if (selectedRamOptions.hasOwnProperty(key)) {
            if (key === "Hãng") {
              if (
                !item.hasOwnProperty("firm") ||
                item["firm"] !== selectedRamOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "bus RAM") {
              if (
                !item.hasOwnProperty("bus") ||
                item["bus"] !== selectedRamOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Dung lượng") {
              if (
                item.hasOwnProperty("size") &&
                item["size"] !== selectedRamOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Loại RAM") {
              if (
                item.hasOwnProperty("type") &&
                item["type"] !== selectedRamOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Đèn LED") {
              if (
                item.hasOwnProperty("led") &&
                item["led"] !== selectedRamOptions[key]
              ) {
                isMatch = false;
                break;
              }
            }
          }
        }

        return isMatch;
      });

      console.log("Filtered RAM Items:", filteredItems);
      setItemList(filteredItems);
    }
    if (selectedSubCategory?.name.includes("Loa")) {
      const filteredItems = itemList.filter((item) => {
        console.log("Selected Laptop Options:", selectedSpeakerOptions);
        console.log("Item being compared:", item);

        let isMatch = true;
        for (const key in selectedSpeakerOptions) {
          if (selectedSpeakerOptions.hasOwnProperty(key)) {
            if (key === "Hãng") {
              if (
                !item.hasOwnProperty("firm") ||
                item["firm"] !== selectedSpeakerOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Bluetooth") {
              if (
                !item.hasOwnProperty("bluetooth") ||
                item["bluetooth"] !== selectedSpeakerOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Loại sản phẩm") {
              if (
                item.hasOwnProperty("type") &&
                item["type"] !== selectedSpeakerOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Màu sắc") {
              if (
                item.hasOwnProperty("color") &&
                item["color"] !== selectedSpeakerOptions[key]
              ) {
                isMatch = false;
                break;
              }
            } else if (key === "Tính năng đặc biệt") {
              if (
                item.hasOwnProperty("led") &&
                item["feature"] !== selectedSpeakerOptions[key]
              ) {
                isMatch = false;
                break;
              }
            }
          }
        }

        return isMatch;
      });

      console.log("Filtered RAM Items:", filteredItems);
      setItemList(filteredItems);
    }
    closeSubModal();
  };

  const resetFilters = () => {
    setSelectedCategory(params?.category || "");
    setSelectedPrice(params?.price || "");
    setSelectedLaptopOptions({});
    setSelectedRamOptions({});
    getItemListByCategory();
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View className="flex-1 w-full flex-row px-2">
        {/* Dropdown sẽ được đặt trong Modal */}
      </View>
      <View className="w-full flex-row items-end justify-end mt-2 pr-2">
        <TouchableOpacity className="mr-2" onPress={resetFilters}>
          <Ionicons name="reload" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="" onPress={toggleModal}>
          <MaterialIcons name="filter-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {itemList.length > 0 ? (
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
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.bottomModal}
      >
        <View className=" bg-zinc-900 h-1/2 rounded-t-xl">
          <View className="px-5 py-4 border-b-2 border-white">
            <Text className="text-white text-lg">Lọc theo sản phẩm</Text>
          </View>
          <FlatList
            data={categoryList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-5 py-2"
                onPress={() => openSubModal(item)}
              >
                <Text className="text-xl text-white">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Modal
        isVisible={isSubModalVisible}
        onBackdropPress={closeSubModal}
        style={styles.bottomModal}
      >
        <View
          style={{
            backgroundColor: "#333",
            height: "50%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: "#fff",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>
              {selectedSubCategory?.name}
            </Text>
          </View>
          <ScrollView>
            {selectedSubCategory?.name.includes("Laptop") && (
              <View>
                <View>{renderLaptopFilterOptions()}</View>
                <TouchableOpacity
                  className="w-full bg-red-500 my-1 flex items-center "
                  onPress={handleApplyFilters}
                >
                  <Text className="text-white text-lg my-2 font-semibold">
                    Xem kết quả
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
          <ScrollView>
            {selectedSubCategory?.name.includes("RAM") && (
              <View>
                <View>{renderRamFilterOptions()}</View>
                <TouchableOpacity
                  className="w-full bg-red-500 my-1 flex items-center "
                  onPress={handleApplyFilters}
                >
                  <Text className="text-white text-lg my-2 font-semibold">
                    Xem kết quả
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
          <ScrollView>
            {selectedSubCategory?.name.includes("Loa") && (
              <View>
                <View>{renderSpeadkerFilterOptions()}</View>
                <TouchableOpacity
                  className="w-full bg-red-500 my-1 flex items-center "
                  onPress={handleApplyFilters}
                >
                  <Text className="text-white text-lg my-2 font-semibold">
                    Xem kết quả
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
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
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
