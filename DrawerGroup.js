import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackGroup from './HomeStackGroup'; // Assuming HomeStackGroup is defined correctly
import Leave from "./screens/drawerScreens/Leave";
import Payments from "./screens/drawerScreens/Payments";
import Instructor from "./screens/drawerScreens/Instructor"
import AboutUsPage from "./screens/drawerScreens/Aboutus";
import FileViewer from "react-native-file-viewer";
import PyamentInfo from "./screens/drawerScreens/PaymentInfo";
import { Ionicons } from "@expo/vector-icons";

import { Image, Pressable, useColorScheme } from "react-native";
const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="Home"
        component={HomeStackGroup}
        options={{
          drawerIcon: ({ size }) => (
            <Image
              source={require("./assets/beto.jpeg")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
        <Drawer.Screen
        name="Instructors Info"
        component={Instructor}
        options={{
          drawerIcon: ({ size }) => (
            <Image
              source={require("./assets/male.png")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings & Profiles"
        component={Payments}
        options={{
          drawerIcon: ({ size }) => (
            <Image
              source={require("./assets/setting.jpg")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Payment info"
        component={PyamentInfo}
        options={{
          drawerIcon: ({ size }) => (
            <Image
              source={require("./assets/money.jpg")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About us"
        component={AboutUsPage}
        options={{
          drawerIcon: ({ size }) => (
            <Image
              source={require("./assets/aboutus.png")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Leave}
        options={{
          drawerIcon: ({ size }) => (
            <Image
              source={require("./assets/logou.jpg")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerGroup;