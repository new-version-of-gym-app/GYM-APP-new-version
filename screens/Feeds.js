import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Animated,
  RefreshControl,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ipadresse } from '../config';

const { width } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Feeds = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = new Animated.Value(0);

  const fetchFeeds = async () => {
    try {
      const result = await axios.get(`http:${ipadresse}:5000/get`);
      setData(result.data);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchFeeds();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFeeds();
      if (route.params?.newfeed) {
        setData((prevData) => [route.params.newfeed, ...prevData]);
      }
    }, [route.params?.newfeed])
  );

  const PostCard = ({ item, index }) => {
    const inputRange = [-1, 0, (index + 1) * 300, (index + 2) * 300];
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.8],
    });

    return (
      <Animated.View style={[styles.postCard, { opacity, transform: [{ scale }] }]}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.photo }} style={styles.postAvatar} />
          <View style={styles.postHeaderText}>
            <Text style={styles.postUsername}>{item.username}</Text>
            <Text style={styles.postDate}>{item.created_at}</Text>
          </View>
        </View>
        <Text style={styles.postDescription}>{item.feed_txt}</Text>
        <View style={styles.postFooter}>
          <Pressable
            style={styles.commentButton}
            onPress={() => navigation.navigate('Comments', { feed_id: item.feeds_id })}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#4A90E2" />
            <Text style={styles.commentButtonText}>Comment</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        style={styles.gradient}
        colors={['#1A1A1A', '#2C2C2C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <AnimatedFlatList
          data={data}
          renderItem={({ item, index }) => <PostCard item={item} index={index} />}
          keyExtractor={(item) => item.feeds_id}
          contentContainerStyle={styles.listContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
          }
        />
      </LinearGradient>
    </View>
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
  listContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  postCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  postHeaderText: {
    flex: 1,
  },
  postAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  postUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  postDate: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  postDescription: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 15,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  commentButtonText: {
    color: '#4A90E2',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default Feeds;