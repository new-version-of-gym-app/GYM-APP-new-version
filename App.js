import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Getstartscreen from "./screens/getstartscreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loginscreen from "./screens/loginscreen";
import Registerscreen from "./screens/registerscreens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="accueil" component={Getstartscreen} options={{headerShown:false}} />
          <Stack.Screen name="login"  component={Loginscreen} options={{headerShown:false}} />
          <Stack.Screen name="register" component={Registerscreen} options={{headerShown:false}}/>
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
