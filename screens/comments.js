import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Userctx } from "../store/Usercontext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { ipadresse } from "../config";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Comments = ({ route }) => {
  const [data, setData] = useState([]);
  const [cmt_txt, setCmt_txt] = useState("");
  const [loading, setLoading] = useState(false);
  const Userinfo = useContext(Userctx);
  const id = route.params.feed_id;
  const scrollY = new Animated.Value(0);

  const fetchComments = async () => {
    try {
      const result = await axios.get(`http:${ipadresse}:5000/getcomments/${id}`);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async () => {
    if (cmt_txt.trim() === "") return;

    try {
      const result = await axios.post(
        `http:${ipadresse}:5000/addcomment/${Userinfo.id}/${id}`,
        { cmt_txt }
      );
      setData([result.data, ...data]);
      setCmt_txt("");
      setLoading(true);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (loading) {
        fetchComments();
        setLoading(false);
      }
    }, [loading])
  );

  const CommentCard = ({ item, index }) => {
    const inputRange = [-1, 0, (index + 1) * 100, (index + 2) * 100];
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.8],
    });

    return (
      <Animated.View style={[styles.commentContainer, { opacity, transform: [{ scale }] }]}>
        <Image source={{ uri: item.photo }} style={styles.avatar} />
        <View style={styles.commentContent}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.commentText}>{item.cmt_txt}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        style={styles.gradient}
        colors={['#1A1A1A', '#2C2C2C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <AnimatedFlatList
              data={data}
              renderItem={({ item, index }) => <CommentCard item={item} index={index} />}
              keyExtractor={(item) => item.comment_id}
              contentContainerStyle={styles.listContainer}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inputContainer}>
          <Image style={styles.avatar} source={{ uri: Userinfo.photo }} />
          <TextInput
            value={cmt_txt}
            onChangeText={setCmt_txt}
            style={styles.input}
            placeholder="Type your comment..."
            placeholderTextColor="#888"
          />
          <TouchableWithoutFeedback onPress={addComment}>
            <Ionicons
              name="send"
              size={24}
              color="#4A90E2"
              style={styles.sendIcon}
            />
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  commentContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  username: {
    fontWeight: "bold",
    color: '#FFFFFF',
    marginBottom: 4,
  },
  commentText: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    color: '#FFFFFF',
  },
  sendIcon: {
    padding: 8,
  },
});

export default Comments;