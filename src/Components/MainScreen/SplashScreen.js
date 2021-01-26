import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar } from "react-native-paper";

const Stack = createStackNavigator();

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../Assets/logo.png")} />
        <Text style={styles.txt}>Instagram</Text>
      </View>
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
  logo: {
    height: 100,
    width: 100,
  },
  txt: {
    fontSize: 60,
    color: "black",
    fontFamily: "insta",
    width: "100%",
    height: 120,
    textAlign: "center",
  },
});
