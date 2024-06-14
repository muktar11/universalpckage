import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Button, useColorScheme } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { getRecentMyVideos } from "../data/myvideofetch";
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'



const MyCourse = () => {
  const [myvideos, setMyVideos] = useState([]);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const myrecentVideos = await getRecentMyVideos();
        if (Array.isArray(myrecentVideos) && myrecentVideos.length > 0) {
          setMyVideos(myrecentVideos);
        } else {
          console.error("Invalid data format returned from API");
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };
  
    fetchMyVideos();
  }, []);
  return (
    <View style={styles.container}>
      <MyVideoContent myvideos={myvideos} /> {/* Rendering TweetContent component */}   
    </View>
  );
}


const MyVideoContent = ({myvideos}) => {

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
             {myvideos.description}
           </Text>
           <GrayText style={styles.author} numberOfLines={1}>
             @Universal
           </GrayText>
           <GrayText>·</GrayText>
          
         </View>
         <Text
           style={[
             styles.description,
             { color: theme === "dark" ? "#FFF" : "#000" },
           ]}
         >
           {myvideos.caption}
         </Text>
 <View style={styles.videoContainer}>
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: myvideos.file,
            },
            useNativeControls: true, // Adds native video controls (play, pause, etc.)
          }}
          width={styles.video.width}
          height={styles.video.height}
        />
      </View>



       
       </View>
     </View>
    </View>
  );
};

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
  mycourses: {
    height: 300,
    width: 300,
    borderRadius: 22,
    marginRight: 6,
    flexShrink: 0,
    marginTop: 2,
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

  image: {
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

export default MyVideoContent;
