import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import ItemList from "../Screens/ItemList";
import ProductDetail from "../Screens/ProductDetail";
import CartScreen from "../Screens/CartScreen";
import OrderScreen from "../Screens/OrderScreen";
import FavoriteScreen from "../Screens/FavoriteScreen";
import SaleScreen from "../Screens/SaleScreen";

const Stack = createStackNavigator();
export default function SaleScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sale"
        component={SaleScreen}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
}
