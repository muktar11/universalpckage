import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Button, useColorScheme } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { getRecentMyCourses } from "../data/mycoursefetch";




const MyCourse = () => {
  const [mycourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const myrecentCourses = await getRecentMyCourses();
        if (Array.isArray(myrecentCourses) && myrecentCourses.length > 0) {
          setMyCourses(myrecentCourses);
        } else {
          console.error("Invalid data format returned from API");
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };
  
    fetchMyCourses();
  }, []);
  return (
    <View style={styles.container}>
      <TweetContent mycourses={mycourses} /> {/* Rendering TweetContent component */}   
    </View>
  );
}


const MyCourseContent = ({mycourses}) => {

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
             {mycourses.title}
           </Text>
          
          
         </View>
          <GrayText style={styles.author} numberOfLines={1}>
             by {mycourses.Instructor}.
           </GrayText>

         <Text
           style={[
             styles.description,
             { color: theme === "dark" ? "#FFF" : "#000" },
           ]}
         >
           {mycourses.content}
         </Text>
<View>
             <GrayText style={styles.author} numberOfLines={1}>
             Course Staring Day {mycourses.startingday}
           </GrayText>
              <GrayText style={styles.author} numberOfLines={1}>
             Course Ending Day {mycourses.endingday}
           </GrayText>
           <GrayText>Streaming Time {mycourses.streamingtime}</GrayText>
           <GrayText>Duration {mycourses.courseduration}</GrayText>
         
 </View>
          


 <View>
<Image style={styles.mycourses} source={{ uri: mycourses.image }} />
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

export default MyCourseContent;
