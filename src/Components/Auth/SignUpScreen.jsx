import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Input, Button } from "galio-framework";
import { firebase } from "../../Firebase/FireBaseConfig";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-elements";
import { Divider } from "react-native-elements";

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
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }
  cameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async res => {
          res.user.updateProfile({
            displayName: this.state.fullName,
            photoURL: this.state.image,
          });
          console.log(res.user.displayName);
          var userData = {
            user: res.user,
          };
          console.log("User registered successfully!");
          var jsonUserData = JSON.stringify(userData);
          await AsyncStorage.setItem("userData", jsonUserData);
          this.props.registered(userData);
          console.log("registerd sucessflly");
        })
        .catch(error => {
          this.setState({ err: error.message });
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
              <>
                <View>
                  <Button
                    onlyIcon
                    icon="close-outline"
                    iconFamily="ionicon"
                    iconSize={20}
                    color="#E14D47"
                    iconColor="#fff"
                    style={{ width: 25, height: 25 }}
                    onPress={() => {
                      this.setState({ image: null });
                    }}
                  >
                    Add Image
                  </Button>
                  <Avatar
                    rounded
                    source={{
                      uri: this.state.image,
                    }}
                    size="large"
                  />
                </View>
              </>
            ) : (
              <>
                <View style={{ flexDirection: "row" }}>
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
                  <Button
                    onlyIcon
                    icon="camera"
                    iconFamily="antdesign"
                    iconSize={30}
                    color="#E14D47"
                    iconColor="#fff"
                    style={{ width: 40, height: 40 }}
                    onPress={this.cameraImage}
                  >
                    Add Image
                  </Button>
                </View>
              </>
            )}
          </View>
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
// collection
//   .add(user)
//   .then(async res => {
//     let userId = res.id;
//     let user = (await collection.doc(userId).get()).data();
//     var userData = {
//       id: userId,
//       data: user,
//     };
//     var jsonUserData = JSON.stringify(userData);
//     await AsyncStorage.setItem("userData", jsonUserData);
//     this.props.registered(userData);
