import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function AccountSettingScreen() {
  const account = [
    {
      title: "Tài khoản",
      prop: [
        { value: "Tài khoản và bảo mật" },
        { value: "Địa chỉ" },
        { value: "Tài khoản / Thẻ ngân hàng" },
      ],
    },
  ];
  const setting = [
    {
      title: "Cài đặt",
      prop: [
        { value: "Cài đặt chat" },
        { value: "Cài đặt Thông báo" },
        { value: "Cài đặt riêng tư" },
        { value: "Người dùng bị chặn" },
        { value: "Ngôn ngữ / Language" },
      ],
    },
  ];

  const support = [
    {
      title: "Hỗ trợ",
      prop: [
        { value: "Trung tâm hỗ trợ" },
        { value: "Tiêu chuẩn cộng đồng" },
        { value: "Điều khoản" },
        { value: "Giới thiệu" },
        { value: "Yêu cầu xóa tài khoản" },
      ],
    },
  ];
  return (
    <ScrollView className="py-2">
      <View>
        {account.map((item, index) => (
          <View key={index} className="">
            <Text className="text-xs m-2">{item.title}</Text>
            <View className="bg-white px-2 ">
              {item.prop.map((subItem, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  className="flex flex-row items-center justify-between w-full px-2 py-4 border-b border-gray-200"
                >
                  <Text>{subItem.value}</Text>
                  <AntDesign name="right" size={15} color="black" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        {setting.map((item, index) => (
          <View key={index} className="">
            <Text className="text-xs my-4 mx-2">{item.title}</Text>
            <View className="bg-white px-2 ">
              {item.prop.map((subItem, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  className="flex flex-row items-center w-full justify-between px-2 py-4 border-b border-gray-200"
                >
                  <Text>{subItem.value}</Text>
                  <AntDesign name="right" size={15} color="black" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        {support.map((item, index) => (
          <View key={index} className="">
            <Text className="text-xs my-4 mx-2">{item.title}</Text>
            <View className="bg-white px-2 ">
              {item.prop.map((subItem, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  className="flex flex-row items-center w-full justify-between px-2 py-4 border-b border-gray-200"
                >
                  <Text>{subItem.value}</Text>
                  <AntDesign name="right" size={15} color="black" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
