import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Input, Button } from "galio-framework";
import { firebase } from "../../Firebase/FireBaseConfig";

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
        res.forEach(doc => {
          if (
            this.state.email == doc.data().email &&
            this.state.password == doc.data().password
          ) {
            var user = {
              id: doc.id,
              data: doc.data(),
            };
            this.props.signIn(user);
            console.log("user logged in successfully");
          } else {
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
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: "red", fontSize: 15 }}>{this.state.err}</Text>
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
    // height: "40%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textContainer: {
    // height: "60%",
    marginTop: 50,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

//
// firebase
//   .auth()
//   .createUserWithEmailAndPassword(
//     this.state.email,
//     this.state.password,
//   )
//   .then(res => {
//     console.log("User account created & signed in!");
//     this.setState({ uuid: res.user.uid });
//   })
//   .catch(error => {
//     if (error.code === "auth/email-already-in-use") {
//       this.setState({
//         err: "That email address is already in use!",
//       });
//     }
//     if (error.code === "auth/invalid-email") {
//       this.setState({ err: "That email address is invalid!" });
//     }
//     console.error(error);
//   });
// firebase
//   .auth()
//   .onAuthStateChanged({
//     email: this.state.email,
//     password: this.state.email,
//   });
