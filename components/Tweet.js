import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import TweetContent from "./TweetContent";

const Tweet = ({ posts }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigate("TweetDetailScreen", { posts });
      }}
    >
      <TweetContent posts={posts} />
    </Pressable>
  );
};

export default Tweet;
