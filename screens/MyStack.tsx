// In App.js in a new project

import * as React from "react";

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddPlan from "./AddPlan";
import EditPlan from "./EditPlan";
import RegisterScreen from "./auth/RegisterScreen";
import QRCodeScreen from "./QRCodeScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

function FirstScreen() {
  return (
    <Tab.Navigator initialRouteName="ScreenOne">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile", headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const RootStack = createStackNavigator();

function MyStack() {
  return (
    <RootStack.Navigator initialRouteName="First">
      <RootStack.Screen
        name="First"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SchedulePlan"
        component={AddPlan}
        options={{ title: "Schedule Plan", headerShown: false }}
      />
      <RootStack.Screen
        name="EditPlan"
        component={EditPlan}
        options={{ title: "Edit Plan", headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default MyStack;
