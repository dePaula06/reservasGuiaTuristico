import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Init from "./src/init";
import Login from "./src/login";
import Register from "./src/register";
import Tabs from "./src/tabsUser/tabs";
import Home from "./src/tabsUser/home";
import HomeAdm from "./src/tabsAdmin/home";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("./assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
            headerShown: false,
          }}
          name="Init"
          component={Init}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
            headerShown: false,
          }}
          name="Register"
          component={Register}
        />

        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
            headerShown: false,
          }}
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
            headerShown: false,
          }}
          name="HomeAdm"
          component={HomeAdm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
