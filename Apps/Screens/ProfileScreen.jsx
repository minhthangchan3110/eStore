import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
export default function ProfileScreen() {
  const { user } = useUser();
  const optionMore = [
    {
      icon: <MaterialIcons name="restore" size={24} color="orange" />,
      title: "Mua lại",
    },
    {
      icon: <MaterialIcons name="favorite" size={24} color="red" />,
      title: "Yêu thích",
    },
    {
      icon: <AntDesign name="clockcircleo" size={24} color="blue" />,
      title: "Đã xem gần đây",
    },
  ];
  const orderMore = [
    {
      icon: <Entypo name="wallet" size={24} color="black" />,
      title: "Chờ xác nhận",
    },
    {
      icon: <AntDesign name="inbox" size={24} color="black" />,
      title: "Chờ lấy hàng",
    },
    {
      icon: <MaterialIcons name="local-shipping" size={24} color="black" />,
      title: "Chờ giao hàng",
    },
  ];
  const supportMore = [
    {
      icon: <MaterialIcons name="contact-support" size={24} color="black" />,
      title: "Trung tâm trợ giúp",
    },
    {
      icon: <MaterialIcons name="support-agent" size={24} color="black" />,
      title: "Trò chuyện với chúng tôi",
    },
  ];

  return (
    <ScrollView className="w-full bg-white ">
      <View className="flex flex-row justify-between bg-black p-4">
        <View>
          <Text className="text-white text-xl font-bold ">2301Store</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="setting" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex items-center ">
        <View>
          <Image
            source={{ uri: user?.imageUrl }}
            className="rounded-full w-[120px] relative h-[120px] mt-4"
          />
          <TouchableOpacity className="border rounded-full p-2 absolute top-4 bg-black right-1">
            <MaterialIcons name="mode-edit" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View className="bg-black py-1 px-4 rounded-full -top-5 border-4 border-white">
          <Text className="text-[14px] font-bold text-white">
            {user?.fullName}
          </Text>
        </View>
      </View>
      {optionMore.map((option, index) => (
        <TouchableOpacity
          key={index}
          className="flex flex-row items-center w-full px-2 py-4 border-b border-gray-200"
        >
          <View className="mr-4">{option.icon}</View>
          <Text className="text-black text-base">{option.title}</Text>
        </TouchableOpacity>
      ))}
      <View className="my-2 px-2">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold">Đơn mua</Text>
          <TouchableOpacity className="flex flex-row items-center justify-center">
            <Text>Xem lịch sử mua hàng</Text>
            <AntDesign name="right" size={14} color="gray" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row w-full mt-2 items-center justify-around">
          {orderMore.map((order, index) => (
            <View className="w-1/3 flex flex-col items-center p-2" key={index}>
              <View>{order.icon}</View>
              <Text>{order.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <LinearGradient
        colors={["#DDDDDD", "#DDDDDD"]}
        style={{ width: "100%", height: 20 }}
      />
      <View className=" my-2">
        <Text className=" mx-2 font-bold">Hỗ trợ</Text>
        {supportMore.map((support, index) => (
          <TouchableOpacity
            key={index}
            className="flex flex-row items-center w-full px-2 py-4 border-b border-gray-200"
          >
            <View className="mr-4">{support.icon}</View>
            <Text className="text-black text-base">{support.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity className=" rounded-lg bg-gray-200 mx-2 p-4 my-1">
        <Text className="text-center text-base font-bold">Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
