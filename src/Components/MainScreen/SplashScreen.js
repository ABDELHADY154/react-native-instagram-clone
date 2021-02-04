import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../Assets/logo.png")} />
        <Text style={styles.txt}>Instagram</Text>
        <ActivityIndicator size="large" color="#E14D47" />
        <StatusBar style="dark" />
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
