import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Input, Button } from "galio-framework";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Divider } from "react-native-elements";

export default class SignInScreen extends Component {
  state = {
    email: "",
    password: "",
    err: "",
  };

  login = () => {
    if (this.state.email === "" && this.state.password === "") {
      alert("Enter details to signin!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          this.props.signIn(res.user);
          console.log("User logged-in successfully!");
        })
        .catch(error => this.setState({ err: error.message }));
    }
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
          <Text style={{ color: "red", fontSize: 15, textAlign: "center" }}>
            {this.state.err}
          </Text>
          <Button color="#E14D47" round onPress={this.login}>
            Login
          </Button>
          <Divider
            style={{
              backgroundColor: "black",
              width: "50%",
              height: 1,
              borderRadius: 50,
            }}
          />
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
