import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { firebase } from "../../Firebase/FireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import Profile from "../Profile/ProfileScreen";
import AllPostsScreen from "../Posts/AllPostsScreen";
import AddPost from "../Posts/CreatePostScreen";
import { Card } from "react-native-elements";

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
    return <AllPostsScreen {...props} navigation={navigation} />;
  };
  AddPostScreen = props => {
    const navigation = useNavigation();
    return <AddPost {...props} navigation={navigation} />;
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
          component={this.AddPostScreen}
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
