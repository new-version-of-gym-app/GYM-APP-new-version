import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import { FIREBASE_AUTH } from "../FirebaseConfig";
import Feeds from "./Feeds";
import Programs from "./Programs";
import Notifications from "./Notifications";
import Category from "./Category";
import Coachs from "./Coachs";
import Following from "./following";
import Profile from "./Profile";
import Area from "./area";
import CalendarComponent from "./Calendar";
import { Feather } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

const Logout = () => null;

const Tabnavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => {
            return (
              <MaterialIcons
                name="category"
                size={size}
                color={focused ? "white" : "blue"}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "blue" }}>Category</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="Feed"
        component={Feeds}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => {
            return (
              <MaterialIcons
                name="feed"
                size={size}
                color={focused ? "white" : "blue"}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "blue" }}>Feed</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="Programs"
        component={Programs}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            return (
              <MaterialCommunityIcons
                name="weather-lightning"
                size={size}
                color={focused ? "white" : "blue"}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "blue" }}>Programs</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            return (
              <MaterialIcons
                name="notifications-none"
                size={size}
                color={focused ? "white" : "blue"}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "white" : "blue" }}>
              Notifications
            </Text>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const Home = () => {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          drawerStyle: { backgroundColor: "black" },

          drawerInactiveTintColor: "white",
        }}
      >
        <Drawer.Screen
          name="START MOVING"
          component={Tabnavigator}
          options={{
            drawerIcon: ({ size, color }) => {
              return <Ionicons name="home" size={size} color={color} />;
            },
          }}
        />

        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({ color, size }) => {
              return <AntDesign name="user" size={size} color={color} />;
            },
          }}
        />

        <Drawer.Screen
          name="Coaches"
          component={Coachs}
          options={{
            drawerIcon: ({ size, color }) => {
              return (
                <FontAwesome5 name="hands-helping" size={size} color={color} />
              );
            },
          }}
        />
         {/* <Drawer.Screen
      name="Calendar"
      component={CalendarComponent}
      options={{
        drawerIcon: ({ size, color }) => {
          return (
            <Feather name="calendar" size={size} color={color} />
          );
        },
      }}
      /> */}
        <Drawer.Screen
          name="Following"
          component={Following}
          options={{
            drawerIcon: ({ size, color }) => {
              return (
                <SimpleLineIcons
                  name="user-following"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />


<Drawer.Screen
          name="YOUR AREA"
          component={Area}
          options={{
            drawerIcon: ({ size, color }) => {
              return (
                <Feather name="map-pin" size={size} color={color} />
              );
            },
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1B1A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  container: {
    alignItems: "center",
  },
});