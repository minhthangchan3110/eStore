import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import ItemList from "../Screens/ItemList";
import ProductDetail from "../Screens/ProductDetail";
import CartScreen from "../Screens/CartScreen";

const Stack = createStackNavigator();
export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={({ route }) => ({
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerTitle: route.params.product.name,
        })}
      />
      <Stack.Screen
        name="cart"
        component={CartScreen}
        options={({ route }) => ({
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerTitle: "Thanh toán",
        })}
      />
    </Stack.Navigator>
  );
}
