import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Button, IconButton, List, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import EditPlanService from "../services/workOutPlans/updatePlan";

// This component and add plan component can easily be generalised.Make time to work on it.DO NOT FORGET.

const EditPlan = () => {
  const { taskDetail } = useSelector((state) => state.editTaskList);
  const [selectedCategory, setSelectedCategory] = useState(
    taskDetail[0].category
  );
  const [exercise, setExercise] = useState(taskDetail[0].name);
  const [totalSets, setTotalSets] = useState(taskDetail[0].sets);
  const [reps, setReps] = useState("");

  const userDetails = useSelector((state) => state.auth);
  const category = ["Arms", "Back", "Cardio", "Chest", "Legs", "Shoulders"];

  // dateTimepicker
  const currentDate = new Date();
  const [mode, setMode] = useState<DateTimePickerMode>("date");
  const [show, setShow] = useState(false);

  const [date, setDate] = useState(currentDate);
  const [tempDate, setTempDate] = useState();
  const [tempTime, setTempTime] = useState();

  const [repsList, setRepsList] = useState(taskDetail[0].reps);

  const navigation = useNavigation();

  async function handleAddPlan() {
    var tempPlan = {
      name: exercise,
      category: selectedCategory,
      date: tempDate == undefined ? taskDetail[0].date : tempDate,
      time: tempTime == undefined ? taskDetail[0].time : tempTime,
      sets: totalSets,
      reps: repsList,
      userId: userDetails.id,
    };
    console.log("time", tempPlan);
    await EditPlanService(taskDetail[0].id, tempPlan)
      .then((response) => {
        Alert.alert("", "Plan Edited Successfully");
      })
      .catch((error) => {
        Alert.alert("", "Edit Failed, Please try again");
      });
  }
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (event.type == "set") {
      //ok button
      date && mode === "date"
        ? console.log("date", selectedDate.toDateString())
        : console.log("time", selectedDate.toTimeString());
      date && mode === "date"
        ? setTempDate(selectedDate.toDateString())
        : setTempTime(selectedDate.toTimeString());
    } else {
      //cancel Button
      return null;
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  function deleteRep(itemIndex) {
    const temp = repsList.filter((element, index) => index != itemIndex);
    setRepsList(temp);
  }

  const renderFlatListItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 8,
          borderColor: "black",
          borderWidth: 0.5,
          margin: 20,
          height: "50%",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item}</Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            style={{ alignSelf: "center" }}
            icon="minus-circle-outline"
            iconColor="black"
            size={18}
            onPress={() => {
              deleteRep(index);
            }}
          />
        </View>
      </View>
    );
  };

  function listEmptyComponent() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>
          Add Reps for each set and press +
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.centeredView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalView}
      >
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          <View
            style={{
              flex: 1,
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 10,
              margin: 5,
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCategory(itemValue);
              }}
            >
              <Picker.Item label="Category" value={"Please Select Category"} />
              {category.map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <IconButton
              style={{ flex: 1, alignSelf: "center" }}
              icon="calendar"
              size={28}
              iconColor="black"
              onPress={showDatepicker}
            />
            <IconButton
              style={{ flex: 1, alignSelf: "center" }}
              icon="clock"
              size={28}
              iconColor="black"
              onPress={showTimepicker}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              mode="outlined"
              label="Exercise"
              placeholder="E.g - Bicep Curls"
              style={{ flex: 1, margin: 10 }}
              value={exercise}
              onChangeText={(text) => {
                setExercise(text);
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <TextInput
                mode="outlined"
                label="Set Count"
                keyboardType="numeric"
                style={{ flex: 1, margin: 20 }}
                value={totalSets}
                onChangeText={(text) => {
                  setTotalSets(text);
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <TextInput
                mode="outlined"
                label="Reps"
                keyboardType="numeric"
                style={{ flex: 2, margin: 15 }}
                value={reps}
                onChangeText={(text) => {
                  setReps(text);
                }}
              />
              <IconButton
                style={{ flex: 1, alignSelf: "center" }}
                icon="plus-circle"
                size={30}
                iconColor="black"
                onPress={() => {
                  if (repsList.length < parseInt(totalSets)) {
                    const temp = [...repsList, reps];
                    setRepsList(temp);
                    setReps("10");
                  } else {
                    Alert.alert("", "Limit Exceeded");
                  }
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <FlatList
              data={repsList}
              extraData={repsList}
              horizontal={true}
              renderItem={renderFlatListItem}
              ListEmptyComponent={listEmptyComponent}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </View>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
              onPress={handleAddPlan}
              mode="contained"
              style={{
                borderRadius: 5,
                marginHorizontal: 20,
              }}
              labelStyle={{
                fontSize: 15,
                letterSpacing: 2,
                fontWeight: "bold",
                color: "white",
                alignSelf: "center",
              }}
            >
              SAVE
            </Button>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
              onPress={() => {
                navigation.goBack();
              }}
              mode="contained"
              style={{
                borderRadius: 5,
                marginHorizontal: 20,
              }}
              labelStyle={{
                fontSize: 15,
                letterSpacing: 2,
                fontWeight: "bold",
                color: "white",
                alignSelf: "center",
              }}
            >
              DONE
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#008b8b",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 220,
    marginHorizontal: 30,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default EditPlan;
export type DateTimePickerMode = "date" | "time";
