import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Input, Button } from "galio-framework";
import { firebase } from "../../Firebase/FireBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default class SignInScreen extends Component {
  state = {
    email: "",
    password: "",
    err: "",
  };

  login = () => {
    const collection = firebase.firestore().collection("users");
    const users = collection.get();
    users
      .then(res => {
        res.forEach(async doc => {
          if (
            this.state.email == doc.data().email &&
            this.state.password == doc.data().password
          ) {
            var user = {
              id: doc.id,
              data: doc.data(),
            };
            var jsonUserData = JSON.stringify(user);
            await AsyncStorage.setItem("userData", jsonUserData);
            this.props.signIn(user);
            console.log("user logged in successfully");
          }
          if (
            this.state.email !== doc.data().email ||
            this.state.password !== doc.data().password
          ) {
            this.setState({ err: "user data invalid" });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../Assets/logo.png")}
          />
          <Text style={styles.txt}>Instagram</Text>
        </View>
        <View style={styles.textContainer}>
          <Input
            style={styles.TextInput}
            placeholder="Emal"
            type="email-address"
            rounded
            onChangeText={val => {
              this.setState({ email: val });
            }}
            placeholderTextColor="grey"
            color="black"
          />
          <Input
            style={styles.TextInput}
            placeholder="password"
            color="black"
            onChangeText={val => {
              this.setState({ password: val });
            }}
            password
            viewPass
            rounded
            placeholderTextColor="grey"
          />
          <Text style={{ color: "red", fontSize: 15 }}>{this.state.err}</Text>

          <Button color="#E14D47" round onPress={this.login}>
            Login
          </Button>
          <Button
            color="info"
            round
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Register
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  TextInput: {
    width: "80%",
    borderWidth: 1.5,
    borderColor: "black",
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: -40,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
