import React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Apps/Screens/LoginScreen";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import TabNavigation from "./Apps/Navigations/TabNavigation";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_ZnJhbmstbWFja2VyZWwtNzQuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen></LoginScreen>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}
