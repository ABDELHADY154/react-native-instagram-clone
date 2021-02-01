import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { cos } from "react-native-reanimated";
import { Image } from "react-native-elements";
import Profile from "../Profile/ProfileScreen";
import { Card } from "react-native-elements";

class Home extends Component {
  state = {
    displayName: null,
    image: null,
    uid: null,
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card
          containerStyle={{
            width: "90%",
            borderRadius: 10,
          }}
        >
          <Card.Image
            source={require("../../Assets/logo.png")}
            style={{ width: "100%" }}
          ></Card.Image>
          <Card.Divider />
          <Card.Title>HELLO WORLD</Card.Title>
        </Card>
      </View>
    );
  }
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component {
  HomeScreenNav = props => {
    const navigation = useNavigation();
    return <Home {...props} navigation={navigation} />;
  };
  ProfileScreenNav = props => {
    const navigation = useNavigation();
    userUpdates = () => {
      this.props.signOut();
    };
    return <Profile {...props} navigation={navigation} loggOut={userUpdates} />;
  };

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#2F7C6E",
          inactiveTintColor: "#222222",
        }}
      >
        <Tab.Screen
          name="Home"
          component={this.HomeScreenNav}
          options={{
            tabBarIcon: () => (
              <Icon
                name="home-outline"
                type="ionicon"
                color="black"
                size={30}
              />
            ),
            title: () => {
              "none";
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: () => (
              <Icon
                name="add-circle-outline"
                type="ionicon"
                color="black"
                size={30}
              />
            ),
            title: () => {
              "none";
            },
          }}
        />
        <Tab.Screen
          name="profile"
          component={this.ProfileScreenNav}
          options={{
            tabBarIcon: () => (
              <Icon
                name="person-circle-outline"
                type="ionicon"
                color="black"
                size={30}
              />
            ),
            title: () => {
              "none";
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
