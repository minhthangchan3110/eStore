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
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Apps/Screens/LoginScreen";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import TabNavigation from "./Apps/Navigations/TabNavigation";
import store from "./redux/store";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_ZnJhbmstbWFja2VyZWwtNzQuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <Provider store={store}>
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
      </Provider>
    </ClerkProvider>
  );
}
