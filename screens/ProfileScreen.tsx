import * as React from "react";
import { useEffect, useState } from "react";

import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import QRCodeScreen from "./QRCodeScreen";

const ProfileScreen = () => {
  const userDetails = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#008b8b",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "skyblue",
          borderRadius: 20,
          marginVertical: 220,
          marginHorizontal: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconButton icon={"account-circle"} size={30} />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {userDetails.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 6,
          }}
        >
          <QRCodeScreen />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Button
            icon="logout"
            mode="contained"
            style={{ borderRadius: 0, alignSelf: "center" }}
            onPress={() => {
              dispatch(logout());
            }}
          >
            Log out
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
