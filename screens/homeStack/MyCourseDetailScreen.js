import { useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import MyCourseContent from "../../components/MyCourseContent";

const MyCourseDetailScreen = () => {
  const {
    params: { mycourses },
  } = useRoute();
  return (
    <View testID="MyCourseDetailScreen" style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <MyCourseContent mycourses={mycourses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyCourseDetailScreen;
