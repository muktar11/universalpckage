import { useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import MyVideoContent from "../../components/MyVideoContent";

const MyVideoDetailScreen = () => {
  const {
    params: { myvideos },
  } = useRoute();
  return (
    <View testID="MyVideoDetailScreen" style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <MyVideoContent myvideos={myvideos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyVideoDetailScreen;