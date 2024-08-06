import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Getstartscreen from "./screens/getstartscreen";
import Loginscreen from "./screens/loginscreen";
import Registerscreen from "./screens/registerscreens";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Home from "./screens/home";
import Details from "./screens/Details";
import Userprovider from "./store/Usercontext";
import Comments from "./screens/comments";
import Fontisto from '@expo/vector-icons/Fontisto';

const Stack = createNativeStackNavigator();

export default function App() {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     setUser(user);
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <Userprovider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"accueil"}>
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="accueil"
            component={Getstartscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Loginscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Registerscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Comments"
          component={Comments}
          options={{
            presentation : "modal" ,
        
          }}
          
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Userprovider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
