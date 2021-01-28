import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Input, Button } from "galio-framework";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

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
      //const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //for camera
      const { status } = await ImagePicker.getCameraPermissionsAsync();
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
    let result = await ImagePicker.launchCameraAsync();
    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  signUp = () => {
    const collection = firebase.firestore().collection("users");
    if (this.state.fullName && this.state.email && this.state.password) {
      var user = {
        name: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
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
    console.log(this.state.image);
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              title="Pick an image from camera roll"
              onPress={this.pickImage}
            >
              Upload
            </Button>
            {this.state.image && (
              <Image
                source={{ uri: this.state.image }}
                style={{ width: 200, height: 200 }}
              />
            )}
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
function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
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
