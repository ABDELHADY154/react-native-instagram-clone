import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Components/MainScreen/SplashScreen";
import HomeScreen from "./src/Components/Home/HomeScreen";
import SignInScreen from "./src/Components/Auth/SignInScreen";
import { firebase } from "./src/Firebase/FireBaseConfig";

const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    isLoading: "",
    userToken: null,
    isSignout: "",
  };

  render() {
    const user = async () => {
      console.log(
        (await firebase.firestore().collection("users").doc("1").get()).data()
          .name,
      );
    };
    user();
    // console.log();
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Sign in",
                animationTypeForReplace: this.state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
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
