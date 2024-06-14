import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feed from "./screens/tabScreens/Feed";
import CourseFeed from "./screens/tabScreens/CourseFeed";
import EventFeed from "./screens/tabScreens/EventFeed";
import MyCourseFeed from "./screens/tabScreens/MyCourseFeed";
import BookFeed from './screens/tabScreens/BookFeed';
import MyVideoFeed from './screens/tabScreens/MyVideoFeed'
import { Ionicons } from "@expo/vector-icons";

import { Image, Pressable, useColorScheme } from "react-native";
const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen
        name="main"
        component={Feed}
        options={{
          tabBarLabel: "Post",
        }}
      />
      <TopTabs.Screen
        name="course"
        component={CourseFeed}
        options={{
          tabBarLabel: "Our Course",
        }}
      />
      <TopTabs.Screen name="My Courses" component={MyCourseFeed} />
      <TopTabs.Screen name="Video Library" component={MyVideoFeed} />
      <TopTabs.Screen name="Book Library" component={BookFeed} />
    </TopTabs.Navigator>
  );
}

export default TopTabsGroup;