import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

// See the README file

import SvgQRCode from "react-native-qrcode-svg";

// Simple usage, defaults for all but the value

// 20% (default) sized logo from local file string with white logo backdrop
function LogoFromFile() {
  let logoFromFile = require("../assets/logo.png");

  return (
    <SvgQRCode
      size={250}
      value="https://expo.dev/@sanath_g/Exercise-Planner?serviceType=classic&distribution=expo-go"
      logo={logoFromFile}
    />
  );
}

export default function QRCodeScreen() {
  return (
    <View style={styles.container}>
      <LogoFromFile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
