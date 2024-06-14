import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Feed from "./screens/tabScreens/Feed";
import CourseFeed from "./screens/tabScreens/CourseFeed";
import EventFeed from "./screens/tabScreens/EventFeed";
import MyCourseFeed from "./screens/tabScreens/MyCourseFeed";
import BookFeed from './screens/tabScreens/BookFeed';
import MyVideoFeed from './screens/tabScreens/MyVideoFeed'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Notifications from "./screens/tabScreens/Notifications";
import { Ionicons } from "@expo/vector-icons";
import TweetDetailScreen from "./screens/homeStack/TweetDetailsScreen";
import CourseDetailScreen from "./screens/homeStack/CourseDetailScreen";
import MyCourseDetailScreen from "./screens/homeStack/MyCourseDetailScreen";
import MyVideoDetailScreen from "./screens/homeStack/MyVideoDetailScreen";
import BookDetailScreen from "./screens/homeStack/BookDetailScreen";
import EventDetailScreen from './screens/homeStack/EventDetailScreen'

import { Image, Pressable, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import Leave from "./screens/drawerScreens/Leave";
import Payments from "./screens/drawerScreens/Payments";
import AboutUsPage from "./screens/drawerScreens/Aboutus";
import FileViewer from "react-native-file-viewer";
import PyamentInfo from "./screens/drawerScreens/PaymentInfo";
// Stack

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

// Tabs
const Tab = createBottomTabNavigator();

function TabsGroup({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "ios-settings-sharp";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "ios-settings-sharp";
          } else if (route.name === "Events") {
            iconName = focused ? "ios-notifications" : "notifications-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={TopTabsGroup}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                source={require("./assets/beto.jpeg")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginLeft: 15,
                }}
              />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen name="Events" component={EventFeed} />
    
    </Tab.Navigator>
  );
}

// Drawer

const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      
      <Drawer.Screen
        name="Home"
        component={HomeStackGroup}
        options={{
          drawerIcon: ({ focused, color, size }) => (
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
      <Drawer.Screen name="Settings & Profiles" component={Payments}  options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/setting.jpg")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }} />
      <Drawer.Screen name="Payment info" component={PyamentInfo}  options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/money.jpg")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }} />
      <Drawer.Screen name="About us" component={AboutUsPage}  options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/aboutus.png")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }} />
      <Drawer.Screen name="Logout" component={Leave}  options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/logou.jpg")}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
            />
          ),
       
        }} />
    </Drawer.Navigator>
  );
}

// Top Tabs

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


       <TopTabs.Screen name="Video Liabrary" component={MyVideoFeed} />
    
     
       <TopTabs.Screen name="Book Liabrary" component={BookFeed} />
        
      </TopTabs.Navigator>
  );
}

export default function Navigation() {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator>
        <Drawer.Screen name="DrawerGroup" component={DrawerGroup} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

