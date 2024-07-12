import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";

const Grid = ({ title, imageUrl , onPress }) => {
  return (
    <View style={Styles.container}>
      <Pressable onPress={onPress}  >
        <ImageBackground style={Styles.image} source={{ uri: imageUrl }}>
          <View style={Styles.titleContainer}>
            <Text style={Styles.title}>{title}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 210,
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Grid;
