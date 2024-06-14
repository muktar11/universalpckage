import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import EventContent from "./EventContent";

const Event = ({ events }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigate("EventDetailScreen", { events });
      }}
    >
      <EventContent events={events} />
    </Pressable>
  );
};

export default Event;
