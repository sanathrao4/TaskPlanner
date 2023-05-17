import React from "react";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/auth/LoginScreen";
import AuthStack from "../screens/AuthStack";
import MyStack from "../screens/MyStack";

export default function () {
  const { id, username, password, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  return isLoggedIn ? <MyStack /> : <AuthStack />;

  // condition ? do something if true :  do something if false
  // true ? HomeScreen :  LoginScreen
}
