import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddPostScreen from "../Screens/ChatScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeScreenStackNav from "./HomeScreenStackNav";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import SaleScreen from "../Screens/SaleScreen";
import FavoriteScreen from "../Screens/FavoriteScreen";
import ChatScreen from "../Screens/ChatScreen";
import SaleScreenStackNav from "./SaleScreenStackNav";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#000" }}
    >
      <Tab.Screen
        name="home-nav"
        component={HomeScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Trang chủ
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="sale-nav"
        component={SaleScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Khuyến mãi
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="shopping-sale" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Yêu thích
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Tư vấn
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
