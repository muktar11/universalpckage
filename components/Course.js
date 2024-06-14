import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import CourseContent from "./CourseContent";

const Course = ({ courses }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigate("CourseDetailScreen", { courses });
      }}
    >
      <CourseContent courses={courses} />
    </Pressable>
  );
};

export default Course;
