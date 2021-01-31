import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

class Home extends Component {
  state = {
    displayName: firebase.auth().currentUser.displayName,
    image: firebase.auth().currentUser.photoURL,
    uid: firebase.auth().currentUser.uid,
  };
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const { navigation } = this.props;
        console.log("logged out");
        this.props.loggOut();
      })
      .catch(error => console.log(error));
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Avatar
          rounded
          source={{
            uri: this.state.image,
          }}
          size="large"
        />
        <Text>Home! {this.state.displayName}</Text>
        <Button color="#3740FE" title="Logout" onPress={() => this.signOut()} />
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
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component {
  HomeScreenNav = props => {
    const navigation = useNavigation();
    userUpdates = () => {
      this.props.signOut();
    };

    return <Home {...props} navigation={navigation} loggOut={userUpdates} />;
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
          component={ProfileScreen}
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
