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

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="accueil" component={Getstartscreen} options={{ headerShown: false }} />
              <Stack.Screen name="login" component={Loginscreen} options={{ headerShown: false }} />
              <Stack.Screen name="register" component={Registerscreen} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
