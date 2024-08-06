import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ipadresse } from "../config";
import React from "react";

import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

const Feeds = ({ route, navigation }) => {
  const [data, setdata] = useState([]);

  const fetchfeeds = async () => {
    const result = await axios.get(`http:${ipadresse}:5000/get`);
    setdata(result.data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchfeeds();
      if (route.params?.newfeed) {
        setdata((data) => [route.params.newfeed, ...data]);
      }
    }, [route.params?.newfeed])
  );





  const PostCard = (itemlist) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: itemlist.item.photo }}
          style={styles.postAvatar}
        />
        <Text style={styles.postUsername}>{itemlist.item.username}</Text>
        <Text style={styles.postDate}>{itemlist.item.created_at}</Text>
      </View>
      <Text style={styles.postDescription}>{itemlist.item.feed_txt}</Text>

      <View style={styles.postFooter}>
        <Pressable  onPress={()=>navigation.navigate("Comments",{feed_id :itemlist.item.feeds_id })}>
          <View style={styles.postButton}>
            <Text style={styles.postButtonText}>Comment</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

  return (
    <LinearGradient style={styles.gradient} colors={["#FFDEE9", "#B5FFFC"]}>
      <FlatList
        data={data}
        renderItem={PostCard}
        keyExtractor={(item) => item.feeds_id}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  garadient: {
    flex: 1,
  },
  imgcontainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  img: {
    opacity: 0.4,
  },

  //////////////////////////////

  background: {
    flex: 1,
    // other styling properties
  },

  postCard: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 13,
    marginTop: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  postUsername: {
    flex: 1,
    fontWeight: "bold",
  },
  postDate: {
    fontSize: 12,
    color: "#A9A9A9",
  },
  postDescription: {
    fontSize: 16,
    color: "#00008B",
  },

  postFooter: {
    flexDirection: "row",
    marginTop: 10,
  },
  postButton: {
    marginHorizontal: 123,
  },
  postButtonText: {
    color: "#808080",
  },
});

export default Feeds;
