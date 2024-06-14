import { useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import CourseContent from "../../components/CourseContent";

const CourseDetailScreen = () => {
  const {
    params: { courses },
  } = useRoute();
  return (
    <View testID="CourseDetailScreen" style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <CourseContent courses={courses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CourseDetailScreen;
