import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { ipadresse } from "../config";

const Coachs = () => {
  const [data, setData] = useState([]);

  const fetchcoaches = async () => {
    try {
      const result = await axios.get(`http://${ipadresse}:5000/coach`);
      setData(result.data);
      console.log("test coaches fetch:", result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchcoaches();
  }, []);

  const coachcards = (itemlist) => {
    return (
      <View style={styles.cardcontainer}>
        <Pressable style={styles.button}>
          <View style={styles.innercontainer}>
            <Image style={styles.photo} source={{ uri: itemlist.item.photo }} />
            <Text style={styles.username}>{itemlist.item.username}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={coachcards}
        keyExtractor={(item) => item.user_id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#2C3E50"
    
  },
  button: {
    flex: 1,
  },
  cardcontainer: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4, 
    backgroundColor: "#AAB7B8",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  photo: {
    width: 120,
    height: 120
  },
  innercontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Coachs;
