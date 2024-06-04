import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";

import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View className="h-[85vh]">
      <Image
        source={require("./../../assets/img/firstScreens.png")}
        className="w-full h-2/3 object-cover"
      />
      <View className="p-5 bg-white">
        <Text className="text-lg font-bold">
          Hoa & Quà Tặng Gửi Người Thương
        </Text>
        <Text className="text-sm text-slate-500 mt-5">
          Tại 2301 Flowers, chúng tôi cam kết chỉ cung cấp những món quà và cắm
          hoa đẹp nhất, được hỗ trợ bởi dịch vụ thân thiện và nhanh chóng.
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-3 bg-pink-400 items-center mt-10 rounded-full "
        >
          <Text className="text-white">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
