import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { getRecentMyBooks} from "../data/mybook";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { WebView } from 'react-native-webview';

const MyBook = () => {
  const [mybooks, setMyBooks] = useState([]);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const myrecentBooks = await getRecentMyBooks();
        if (Array.isArray(myrecentBooks) && myrecentBooks.length > 0) {
          setMyBooks(myrecentBooks);
        } else {
          console.error("Invalid data format returned from API");
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchMyBooks();
  }, []);

  return (
    <View style={styles.container}>
      <MyBookContent mybooks={mybooks} />
    </View>
  );
};

const MyBookContent = ({ mybooks }) => {
  const theme = useColorScheme();

  const GrayText = ({ children, numberOfLines, style }) => {
    return (
      <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    );
  };

  return (
    <View style={styles.singleItem}>
      <View style={styles.row}>
        <View style={styles.tweetContentContainer}>
          <View style={styles.rowTop}>
            <Text
              numberOfLines={1}
              style={[
                styles.header,
                { color: theme === "dark" ? "#FFF" : "#000" },
              ]}
            >
              {mybooks.caption}
            </Text>
            <GrayText style={styles.author} numberOfLines={1}>
              @Universal
            </GrayText>
            <GrayText>·</GrayText>
          </View>
         
          <SafeAreaProvider>
            <SafeAreaView style={styles.webViewContainer}>
              <WebView
                source={{ uri: mybooks.Book_imageUrl }}
                
                style={styles.webView}
              />
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    flexShrink: 1,
  },
  gray: {
    color: "#777",
    fontSize: 13,
    paddingRight: 2,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingRight: 4,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#000",
  },
  singleItem: {
    paddingHorizontal: 16,
    minHeight: 44,
    flex: 1,
    padding: 16,
  },
  rowTop: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  tweetContentContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  webViewContainer: {
    flex: 1,
    height: 400,  // Adjust as needed for your layout
    marginTop: 20,
  },
  webView: {
    flex: 1,
  },
});



export default MyBookContent;
