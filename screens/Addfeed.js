import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Button,
  Keyboard,
  Pressable,

} from "react-native";
import Btn from "../componets/Add-feed-btn/btn";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ipadresse } from "../config";
import { Userctx } from "../store/Usercontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";


const Addfeed = ({ navigation }) => {
  const [text, setText] = useState("");
  const Userinfo = useContext(Userctx);

  const addfd = async () => {
    try {
      console.log("add feed is working");
      const userid = await Userinfo.id;
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `http://${ipadresse}:5000/add/${userid}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
         setText("")
      if (result.data == "new feed is added") {
        navigation.navigate("Feed",{newfeed:result.data});
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleEndEditing = () => {
  //   Keyboard.dismiss(); // Ferme le clavier
  // };
  return (
    <Pressable  style={styles.presss}>
      <LinearGradient style={styles.gradient} colors={["#000000", "#CCCCCC"]}>
        <ImageBackground
          source={require("../assets/images/feed.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <View style={styles.container}>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={4}
              value={text}
              onChangeText={(txt) => setText(txt)}
              placeholder="Enter your text here..."
              placeholderTextColor="white"
              returnKeyType="done"
            />
          </View>
          <View style={styles.add}>
            <Btn onpress={addfd} />
          </View>
        </ImageBackground>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    flex: 1,
  },
  textarea: {
    height: 250,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 8,
    textAlign: "left",
    borderColor: "#CCCCCC",
    fontSize: 20,
    color: "white",
  },
  gradient: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    opacity: 0.25,
  },
  presss: {
    flex: 1,
  },
  add: {
    marginBottom: 250,
  },
});

export default Addfeed;
