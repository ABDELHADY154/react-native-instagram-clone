import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Input, Button } from "galio-framework";
import { firebase } from "../../Firebase/FireBaseConfig";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default class SignUpScreen extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    err: "",
    image: null,
  };
  async componentDidMount() {
    if (Platform.OS !== "web") {
      //for galary
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //for camera
      // const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  pickImage = async () => {
    /*
        //for galary
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
      */

    //for camera
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  signUp = () => {
    const collection = firebase.firestore().collection("users");
    if (
      this.state.fullName &&
      this.state.email &&
      this.state.password &&
      this.state.image
    ) {
      var user = {
        name: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        img: this.state.image,
      };
      collection
        .add(user)
        .then(async res => {
          let userId = res.id;
          let user = (await collection.doc(userId).get()).data();
          var userData = {
            id: userId,
            data: user,
          };
          var jsonUserData = JSON.stringify(userData);
          await AsyncStorage.setItem("userData", jsonUserData);
          this.props.registered(userData);
          console.log("registerd sucessflly");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ err: "Please fill all fields" });
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {this.state.image ? (
              <Image
                source={{ uri: this.state.image }}
                style={{ width: 100, height: 100, borderRadius: 150 }}
              />
            ) : (
              <Button
                onlyIcon
                icon="plus"
                iconFamily="antdesign"
                iconSize={30}
                color="#E14D47"
                iconColor="#fff"
                style={{ width: 40, height: 40 }}
                onPress={this.pickImage}
              >
                Add Image
              </Button>
            )}

            {/* {this.state.image && (
              
            )} */}
          </View>
          {/* <Avatar.Text size={40} label="+" /> */}
          <Input
            style={styles.TextInput}
            placeholder="Full Name"
            rounded
            onChangeText={val => {
              this.setState({ fullName: val });
            }}
            placeholderTextColor="grey"
            color="black"
          />
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

          <Button color="#E14D47" round onPress={this.signUp}>
            Register
          </Button>
          <Button
            color="info"
            round
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            Sign In
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textContainer: {
    marginTop: -40,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
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
