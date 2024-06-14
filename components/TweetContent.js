import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, useColorScheme } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { getRecentPosts } from "../data/tweetfetch";
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'

const Tweet = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const recentPosts = await getRecentPosts();
        if (Array.isArray(recentPosts) && recentPosts.length > 0) {
          setPosts(recentPosts);
        } else {
          console.error("Invalid data format returned from API");
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };
  
    fetchPosts();
  }, []);
  

  return (
    <View style={styles.container}>
      <TweetContent posts={posts} /> {/* Rendering TweetContent component */}
    </View>
  );
}



const TweetContent = ({posts }) => {
  const theme = useColorScheme();

  const GrayText = ({ children, numberOfLines, style }) => {
    return (
      <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    );
  };

  url = 'https://www.youtube.com/watch?v=IYSxN5sNQ_M'
  return (
      <View  style={styles.singleItem}>
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
                Universal Admin
              </Text>
              <GrayText style={styles.author} numberOfLines={1}>
                @student publication
              </GrayText>
              <GrayText>·</GrayText>
              <GrayText>2h</GrayText>
            </View>
            <Text
              style={[
                styles.description,
                { color: theme === "dark" ? "#FFF" : "#000" },
              ]}
            >
              {posts.caption}
            </Text>
            {posts.image && (
              <Image style={styles.post} source={{ uri: posts.image }} />
            )}

            {posts.video && (

 <View style={styles.videoContainer}>
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: posts.video,
            },
            useNativeControls: true, // Adds native video controls (play, pause, etc.)
          }}
          width={styles.video.width}
          height={styles.video.height}
        />
      </View>
            ) }


          </View>
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  author: {
    flexShrink: 1,
  },
  actionBar: {
    marginTop: 8,
    justifyContent: "space-between",
    marginRight: 16,
  },
  actionButton: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  gray: {
    color: "#777",
    fontSize: 13,
    paddingRight: 2,
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 16,
    flexShrink: 0,
    marginTop: 4,
  },

    videoContainer: {
    width: '100%', // Container width (optional, can be adjusted)
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  video: {
    
    width: '100%', // Video width
    height: '100%', // Video height
  },
  
  post: {
    height: 300,
    width: 300,
    borderRadius: 22,
    marginRight: 6,
    flexShrink: 0,
    marginTop: 2,
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
  rowActions: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  elemAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actionText: {
    fontSize: 12,
    color: "#444",
  },
  tweetContentContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

export default TweetContent;
