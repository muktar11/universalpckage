import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import MyCourseContent from "./MyCourseContent";

const Tweet = ({ mycourses }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigate("MyCourseDetailScreen", { mycourses });
      }}
    >
      <MyCourseContent mycourses={mycourses} />
    </Pressable>
  );
};

export default Tweet;
