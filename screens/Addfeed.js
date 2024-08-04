import { useState } from "react";
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
const Addfeed = () => {
  const [text, setText] = useState("");

  const handleEndEditing = () => {
    Keyboard.dismiss(); // Ferme le clavier
  };
  return (
    <Pressable onPress={handleEndEditing} style={styles.presss}>
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
              onChangeText={setText}
              placeholder="Enter your text here..."
              placeholderTextColor="white"
              returnKeyType="done"
            />
          </View>
          <View style={styles.add}>
            <Btn />
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
