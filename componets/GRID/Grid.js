import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";

const Grid = ({ title, imageUrl, onPress }) => {
  return (
    <View style={Styles.container}>
      <Pressable onPress={onPress} android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}>
        <ImageBackground style={Styles.image} source={{ uri: imageUrl }}>
          <View style={Styles.gradientOverlay} />
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
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 210,
    justifyContent: "flex-end",
    borderRadius: 20,
    overflow: "hidden",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default Grid;
