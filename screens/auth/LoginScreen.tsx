import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Button, Card, HelperText, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { setUserState } from "../../redux/slices/userListSlice";
import GetAllUsersServices from "../../services/users/getAllUsersService";

const LoginScreen = () => {
  const [userList, setUserList] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const checkUserEmail = () => {
    var bool = false;
    userList.forEach((item, index) => {
      if (email == item.email) {
        bool = true;
      }
    });
    return bool;
  };
  const checkUserPassword = () => {
    var bool = false;
    // can be checked by has own property with username to reduce computation time
    userList.forEach((item, index) => {
      if (item.email === email) {
        if (password === item.password) {
          bool = true;
        }
      }
    });

    return bool;
  };

  const getUserId = () => {
    var userId;
    // can be checked by has own property with username to reduce computation time
    userList.forEach((item, index) => {
      if (email == item.email) {
        userId = item.id;
      }
    });

    return userId;
  };

  const handleLogin = () => {
    if (checkUserEmail()) {
      if (checkUserPassword()) {
        dispatch(
          login({
            email: email,
            password: password,
            id: getUserId(),
            isLoggedIn: true,
          })
        );
      } else {
        Alert.alert("", "Incorrect Password!");
      }
    } else {
      Alert.alert("", "Incorrect email!");
    }
  };

  // create a thunk instead of calling the api here
  async function getUserList() {
    var tempUserList = [];
    await GetAllUsersServices()
      .then((response) => {
        response.forEach((doc) => {
          const { id } = doc;
          const { email, password } = doc.data();
          const tempUser = {
            email: email,
            password: password,
            id: id,
          };
          tempUserList.push(tempUser);
        });

        // The more I think about, it the below written dispatch and corresponding reducer is not necessary, because its safer to assume the db is always dynamic coz a lot CRUD can take place and the userList keeps changing        dispatch(setUserState(tempUserList));
        dispatch(setUserState(tempUserList));
        setUserList([...tempUserList]);
      })
      .catch();
  }

  useEffect(() => {
    getUserList();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "#008b8b" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          borderRadius: 15,
          borderColor: "black",
          borderWidth: 2.5,
          marginVertical: 250,
          marginHorizontal: 40,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 5 }}>
            WELCOME!
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", letterSpacing: 5 }}>
            WorkOut Planner
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
            placeholder="Enter a valid email"
            style={{ margin: 10 }}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            label="Password"
            textContentType="password"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            mode="outlined"
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setSecureTextEntry(!secureTextEntry);
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
              navigation.navigate("Register");
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
            Register
          </Button>
          <Button
            onPress={handleLogin}
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
            Login
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
