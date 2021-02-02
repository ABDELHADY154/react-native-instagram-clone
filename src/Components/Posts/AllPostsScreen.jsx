import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Card } from "react-native-elements";
export default class AllPosts extends Component {
  state = {
    displayName: null,
    image: null,
    uid: null,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 50,
        }}
      >
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
          <Card.Title style={{ textAlign: "left", fontWeight: "normal" }}>
            HELLO WORLD
          </Card.Title>
        </Card>
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
});
