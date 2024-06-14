import { useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import BookContent from "../../components/BookContent";

const BookDetailScreen = () => {
  const {
    params: { books },
  } = useRoute();
  return (
    <View testID="BookDetailScreen" style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <BookContent books={books} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BookDetailScreen;
