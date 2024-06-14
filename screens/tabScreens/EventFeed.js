import React from "react";
import {
    Button,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import { getRecentEvents } from "../../data/eventfetch";
  import Event from "../../components/Event";
  import { useNavigation } from "@react-navigation/native";
  import { useLayoutEffect } from "react";
  
  export default function EventFeed() {
    const navigation = useNavigation();
    const [events, setEvents] = React.useState([]);
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../../assets/beto.jpeg")}
              style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
            />
          </Pressable>
        ),
      });
    }, []);

    React.useEffect(() => {
      const fetchEvents = async () => {
        try {
          const recentEvents = await getRecentEvents();
          setEvents(recentEvents);
        } catch (error) {
          console.error("Error fetching recent posts:", error);
        }
      };
  
      fetchEvents();
    }, []);
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={events}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <Event events={item} />;
          }}
          // ListHeaderComponent={() => (
          //   <View style={styles.header}>
          //     <Text style={styles.headerTitle}>New tweets available</Text>
          //   </View>
          // )}
          ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    divider: {
      width: "100%",
      height: StyleSheet.hairlineWidth,
      backgroundColor: "#DDD",
    },
    header: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1DA1F2",
    },
    footer: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      color: "#FFFFFF",
      padding: 8,
      borderRadius: 12,
      fontSize: 12,
    },
    footerTitle: {
      padding: 8,
      borderRadius: 12,
      fontSize: 12,
    },
    emptyComponentTitle: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
    },
    emptyComponentSubtitle: {
      color: "#808080",
      padding: 8,
      fontSize: 14,
      textAlign: "center",
    },
    emptyComponent: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
  });
  