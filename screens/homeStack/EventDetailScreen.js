import { useRoute } from "@react-navigation/native";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import EventContent from "../../components/EventContent";

const EventDetailScreen = () => {
  const {
    params: { events },
  } = useRoute();
  return (
    <View testID="EventDetailScreen" style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <EventContent events={events} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EventDetailScreen;
