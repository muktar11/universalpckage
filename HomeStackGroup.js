import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsGroup from './TabGroup';
import TweetDetailScreen from "./screens/homeStack/TweetDetailsScreen";
import CourseDetailScreen from "./screens/homeStack/CourseDetailScreen";
import MyCourseDetailScreen from "./screens/homeStack/MyCourseDetailScreen";
import MyVideoDetailScreen from "./screens/homeStack/MyVideoDetailScreen";
import BookDetailScreen from "./screens/homeStack/BookDetailScreen";
import EventDetailScreen from './screens/homeStack/EventDetailScreen'
import { Ionicons } from "@expo/vector-icons";

import { Image, Pressable, useColorScheme } from "react-native";
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="TabsGroup" component={TabsGroup} />
      <HomeStack.Screen
        name="TweetDetailScreen"
        component={TweetDetailScreen}
        options={{
          presentation: "modal",
          headerTitle: "Tweet Details",
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="CourseDetailScreen"
        component={CourseDetailScreen}
        options={{
          presentation: "modal",
          headerTitle: "Course Details",
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="MyCourseDetailScreen"
        component={MyCourseDetailScreen}
        options={{
          presentation: "modal",
          headerTitle: "My Course Details",
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="MyVideoDetailScreen"
        component={MyVideoDetailScreen}
        options={{
          presentation: "modal",
          headerTitle: "My Video Details",
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="BookDetailScreen"
        component={BookDetailScreen}
        options={{
          presentation: "modal",
          headerTitle: "Book Resources",
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{
          presentation: "modal",
          headerTitle: "Event Details",
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackGroup;