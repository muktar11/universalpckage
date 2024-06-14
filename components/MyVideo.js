import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import MyVideoContent from "./MyVideoContent";

const MyVideo = ({ myvideos }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigate("MyVideoDetailScreen", { myvideos });
      }}
    >
      <MyVideoContent myvideos={myvideos} />
    </Pressable>
  );
};

export default MyVideo;
