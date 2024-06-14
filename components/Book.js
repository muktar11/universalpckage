import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import BookContent from "./BookContent";

const Book = ({ mybooks }) => {
  const { navigate } = useNavigation();
  return (

      <BookContent mybooks={mybooks} />
 
      
  );
};

export default Book;
