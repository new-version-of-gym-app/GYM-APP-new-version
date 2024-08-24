import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { ipadresse } from "../config";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.45;

const Coachs = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCoaches = async () => {
    try {
      setRefreshing(true);
      const result = await axios.get(`http://${ipadresse}:5000/coach`);
      setData(result.data);
      console.log("Coaches fetched:", result.data);
    } catch (err) {
      console.log("Error fetching coaches:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const CoachCard = React.memo(({ item, index }) => {
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <AnimatedPressable
        style={[
          styles.cardContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        onPress={() => console.log(`Coach ${item.username} pressed`)}
      >
        <Image style={styles.photo} source={{ uri: item.photo }} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <Text style={styles.username}>{item.username}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{(Math.random() * 2 + 3).toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </AnimatedPressable>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expert Coaches</Text>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CoachCard item={item} index={index} />}
        keyExtractor={(item) => item.user_id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={fetchCoaches}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  cardContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.3,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#16213E',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
});

export default Coachs;