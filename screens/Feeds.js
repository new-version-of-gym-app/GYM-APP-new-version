import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { ipadresse } from "../config";

import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const Feeds = () => {
  const [data, setdata] = useState([]);

  const fetchfeeds = async () => {
    const result = await axios.get(`http:${ipadresse}:5000/get`);
    console.log(result.data);
    setdata(result.data);
  };

  useLayoutEffect(() => {
    fetchfeeds();
  }, []);

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
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.postButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFDEE9", "#B5FFFC"]}>
        <FlatList
          data={data}
          renderItem={PostCard}
          keyExtractor={(item) => item.feeds_id.toString()}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  garadient: {
    flex: 1,
  },
  imgcontainer: {
    flex: 1,
  },
  img: {
    opacity: 0.4,
  },

  //////////////////////////////
  container: {
    paddingTop: 10,
  },
  background: {
    flex: 1,
    // other styling properties
  },

  postCard: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 13,
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
    marginRight: 10,
  },
  postButtonText: {
    color: "#808080",
  },
});

export default Feeds;
