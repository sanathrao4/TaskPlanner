import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Button, Card, HelperText, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import AddDocumentService from "../../services/addDataService";

const RegisterScreen = () => {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const pattern = "/\b[w.-]+@[w.-]+.w{2,4}\b/gi";
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { userList } = useSelector((state) => state.userList);

  const checkUserName = () => {
    var bool = true;
    userList.forEach((item, index) => {
      if (item.email == email) {
        bool = false;
      }
    });
    return bool;
  };
  const checkUserPassword = () => {
    var bool = false;
    password === confirmPassword ? (bool = true) : (bool = false);
    return bool;
  };

  // example@gmail.co -> will yield a true
  function validateEmail() {
    let temp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var bool = false;
    var validation = email.toLowerCase().match(temp);
    validation != null ? (bool = true) : (bool = false);
    return bool;
  }

  function validatePassword() {
    var bool = false;
    password.length > 5 ? (bool = true) : (bool = false);
    return bool;
  }

  const handleRegister = async () => {
    if (validateEmail()) {
      if (validatePassword()) {
        if (checkUserName()) {
          if (checkUserPassword()) {
            let tempUser = {
              email: email,
              password: password,
            };
            await AddDocumentService("users", tempUser);
            navigation.goBack();
          } else {
            Alert.alert("", "Password needs to be same");
          }
        } else {
          Alert.alert("", "Email already exists! Please try Login");
        }
      } else {
        Alert.alert("", "Password needs to be more than 5 characters");
      }
    } else {
      Alert.alert("", "Invalid Email!");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#008b8b" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          borderRadius: 15,
          borderColor: "black",
          borderWidth: 2.5,
          marginVertical: 200,
          marginHorizontal: 40,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 25, fontWeight: "bold", alignSelf: "center" }}
          >
            WELCOME!
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "space-evenly",
          }}
        >
          <TextInput
            mode="outlined"
            label="Email"
            style={{ margin: 10 }}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            label="Password"
            textContentType="password"
            secureTextEntry={securePassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            mode="outlined"
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setSecurePassword(!securePassword);
                  return false;
                }}
              />
            }
            style={{ margin: 10 }}
          />
          <TextInput
            label="Confirm Password"
            textContentType="password"
            secureTextEntry={secureConfirmPassword}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            mode="outlined"
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setSecureConfirmPassword(!secureConfirmPassword);
                  return false;
                }}
              />
            }
            style={{ margin: 10 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            onPress={() => {
              navigation.navigate("Login");
            }}
            mode="contained"
            style={{
              flex: 1,
              borderRadius: 5,
              marginHorizontal: 20,
            }}
            labelStyle={{
              fontSize: 16,
              letterSpacing: 3,
              fontWeight: "bold",
              color: "white",
              alignSelf: "center",
            }}
          >
            Back
          </Button>
          <Button
            onPress={handleRegister}
            mode="contained"
            style={{
              flex: 1,
              borderRadius: 5,
              marginHorizontal: 20,
            }}
            labelStyle={{
              fontSize: 15,
              letterSpacing: 3,
              fontWeight: "bold",
              color: "white",
              alignSelf: "center",
            }}
          >
            Sign Up
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
