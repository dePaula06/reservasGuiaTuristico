import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import Home from "./home";
import Guias from "./guias";
import User from "./user";

const Tab = createBottomTabNavigator();
function Tabs(){

    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#0499D2',
            tabBarIcon: ({ color, size, focused }) => {
              let iconName;
    
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Guias") {
                iconName = focused ? "location" : "location-outline";
              } else if (route.name === "User") {
                iconName = focused ? "person" : "person-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
    
        >
        <Tab.Screen
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
        <Tab.Screen
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
        name="Guias"
        component={Guias}
      />
        <Tab.Screen
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
        name="User"
        component={User}
      />
        </Tab.Navigator>

    )

}

export default Tabs;