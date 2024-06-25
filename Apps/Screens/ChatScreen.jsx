import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { database } from "../../firebaseConfig";
import { Feather } from "@expo/vector-icons";

const ChatScreen = () => {
  const { user } = useUser();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesQuery = query(
      collection(database, "messages"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (!user || !user.id || !user.fullName || !user.imageUrl) {
      console.error("User is not properly defined");
      return;
    }

    if (newMessage.trim()) {
      await addDoc(collection(database, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: {
          id: user.id,
          name: user.fullName,
          image: user.imageUrl,
        },
      });

      setNewMessage("");
    }
  };

  return (
    <View className="bg-white  flex-1  p-3">
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          const isCurrentUser = item.user.id === user.id;

          return (
            <View
              className={`flex-row items-end py-[2px] ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <Image
                  source={{ uri: item.user.image }}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              <View>
                {!isCurrentUser && (
                  <Text className="mb-1 text-xs text-gray-400">
                    {item.user.name}
                  </Text>
                )}
                <Text
                  className={`px-3 py-2 rounded-full  text-white ${
                    isCurrentUser
                      ? "ml-10 mt-2 bg-green-500"
                      : "mr-10 bg-blue-500"
                  }`}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        inverted
      />

      <View className="flex flex-row items-center border rounded-full border-gray-300 mt-4">
        <TextInput
          className="w-4/5 py-1 px-6 my-2"
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhắn tin"
        />

        <TouchableOpacity
          className="flex items-center justify-center w-1/5"
          onPress={handleSendMessage}
        >
          <Feather name="send" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
