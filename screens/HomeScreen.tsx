import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";

import { View, Text, FlatList, StyleSheet } from "react-native";
import { FAB, IconButton, Appbar, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import db from "../database/firestore";
import { setPlanState } from "../redux/slices/editTaskSlice";

const HomeScreen = () => {
  const [planList, setPlanList] = useState([]);
  const userDetails = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  function renderAppBar() {
    return (
      <Appbar.Header>
        <Appbar.Action icon="Home" />
        <Appbar.Content title="Home Screen" subtitle="Favorites" />
      </Appbar.Header>
    );
  }

  function fabComponent() {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    return (
      <FAB.Group
        open={open}
        icon={open ? "arrow-up" : "plus"}
        color="black"
        actions={[
          {
            icon: "clipboard-text",
            label: "Add Plans",
            onPress: () => navigation.navigate("SchedulePlan"),
          },
        ]}
        onStateChange={onStateChange}
      />
    );
  }

  function setEditPlanData(item) {
    dispatch(setPlanState(item));
  }

  // list of plans is getting dipalyed
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          borderColor: "black",
          backgroundColor: "white",
          margin: 18,
          height: 150,
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "center",
              color: "#008b8b",
            }}
          >
            {/* displaying the exercise name */}
            {item.category} - {item.name}
          </Text>
        </View>
        <Divider style={{ width: "100%", height: 2 }} />
        <View
          style={{
            flex: 3,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 6,
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={styles.attributeText}>Sets - {item.sets}</Text>
            <Text style={styles.attributeText}>
              Reps -{" "}
              {item.reps.map((value, index) => {
                if (index != 0) {
                  return "," + value;
                }
                return value;
              })}
            </Text>

            <Text style={styles.attributeText}>Date - {item.date}</Text>
            <Text style={styles.attributeText}>Time - {item.time}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              icon={"pencil"}
              iconColor="#008b8b"
              onPress={async () => {
                await setEditPlanData(item);
                navigation.navigate("EditPlan");
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, marginVertical: 300, alignSelf: "center" }}>
        <Text style={styles.emptyListTextStyle}>No WorkOut Plans Yet!</Text>
        <Text style={styles.emptyListTextStyle}>
          Click the + icon to add your plans.
        </Text>
      </View>
    );
  };
  async function getDetails() {
    let tempPlan = [];
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      const { id } = doc;
      const { userId, sets, reps, name, date, time, category } = doc.data();

      if (userDetails.id == userId) {
        let planObj = {
          id: id,
          userId: userId,
          sets: sets,
          name: name,
          date: date,
          time: time,
          category: category,
          reps: reps,
        };
        tempPlan.push(planObj);
      }
    });
    setPlanList(tempPlan);
  }

  useEffect(() => {
    getDetails();
  }, [isFocused == true]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#008b8b",
      }}
    >
      {/* List item component */}
      <FlatList
        style={{
          flex: 1,
          marginVertical: 70,
        }}
        data={planList}
        extraData={planList}
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ListEmptyComponent}
      />
      {fabComponent()}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  attributeText: { fontSize: 15, fontWeight: "500" },
  emptyListTextStyle: { fontSize: 20, fontWeight: "bold" },
});
