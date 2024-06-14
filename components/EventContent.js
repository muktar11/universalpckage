import React, {useState, useEffect} from "react";
import { StyleSheet, View, Image, Text, useColorScheme, TouchableOpacity, Linking } from "react-native";
import { getRecentEvents } from "../data/eventfetch";


const Event = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const recentEvents = await getRecentEvents();
        if (Array.isArray(recentEvents) && recentEvents.length > 0) {
          setEvents(recentEvents);
        } else {
          console.error("Invalid data format returned from API");
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };
  
    fetchEvents();
  }, []);
  return (
    <View style={styles.container}>
      <EventContent events={events} /> {/* Rendering TweetContent component */}
    </View>
  );
}

const EventContent = ({events}) => {

  const theme = useColorScheme();
  const GrayText = ({ children, numberOfLines, style }) => {
    return (
      <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    );
  };
  // Function to handle clicking on class link
const handleClassLinkPress = async (url) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error("Error opening URL:", error);
    // Handle the error here, e.g., show a toast message or log it
  }
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
                    {events.audience}
                  </Text>
                </View>
                <View>
                  <GrayText style={styles.author} numberOfLines={1}>
                    Instructor: {events.title}
                  </GrayText>
                  <GrayText style={styles.author} numberOfLines={1}>
                    Course Starting Day: {events.startingday}
                  </GrayText>
                  <GrayText style={styles.author} numberOfLines={1}>
                    Course Ending Day: {events.endingday}
                  </GrayText>
                  <GrayText>Streaming Time: {events.startingtime}</GrayText>
                  <GrayText>Duration: {events.endtime}</GrayText>
                  <TouchableOpacity onPress={() => handleClassLinkPress(events.class_link)}>
              <GrayText>Class Link: {events.class_link}</GrayText>
            </TouchableOpacity>
                  <GrayText>Class Password: {events.class_password}</GrayText>
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

export default EventContent;
