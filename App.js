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
import * as Font from "expo-font";
const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isSignout: true,
    fontsLoaded: false,
  };
  async loadFonts() {
    await Font.loadAsync({
      insta: require("./src/Assets/Fonts/Billabong.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadFonts();
    }, 2000);
  }

  render() {
    if (!this.state.fontsLoaded == true) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLoggedIn == false ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                header: () => {
                  "none";
                },
              }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => {
                  "none";
                },
              }}
            />
          )}
        </Stack.Navigator>
        <StatusBar style="dark" />
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
