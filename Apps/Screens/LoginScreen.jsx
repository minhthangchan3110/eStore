import { View, Text, Image, TouchableOpacity } from "react-native";
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
      const { createdSessionId, signIn, signUp, setActive, error } =
        await startOAuthFlow();

      // Kiểm tra nếu có lỗi
      if (error) {
        console.error("OAuth error", error);
        alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
        return;
      }

      // Kiểm tra các giá trị trả về
      console.log("OAuth Response:", { createdSessionId, signIn, signUp });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        console.log("Session created successfully:", createdSessionId);
      } else {
        // Xử lý nếu phiên không được tạo
        if (signUp.status === "missing_requirements") {
          // Điền vào các thông tin bắt buộc nếu còn thiếu
          console.log("Thông tin đăng ký còn thiếu:", signUp.missingFields);
          alert("Vui lòng điền đầy đủ thông tin đăng ký.");
          // Bạn có thể hướng dẫn người dùng hoàn thiện thông tin cần thiết ở đây
        } else {
          console.log("Không có phiên nào được tạo");
          alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
        }
      }
    } catch (err) {
      console.error("Lỗi OAuth", err);
      // Hiển thị thông báo lỗi thân thiện với người dùng
      alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
    }
  }, [startOAuthFlow]);

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
          className="p-3 bg-pink-400 items-center mt-10 rounded-full"
        >
          <Text className="text-white">Bắt Đầu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
