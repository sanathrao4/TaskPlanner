// In App.js in a new project

import * as React from "react";

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddPlan from "./AddPlan";
import EditPlan from "./EditPlan";
import RegisterScreen from "./auth/RegisterScreen";
import LoginScreen from "./auth/LoginScreen";

const AuthStackScreen = createStackNavigator();

function AuthStack() {
  return (
    <AuthStackScreen.Navigator initialRouteName="Login">
      <AuthStackScreen.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStackScreen.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register", headerShown: false }}
      />
    </AuthStackScreen.Navigator>
  );
}

export default AuthStack;
