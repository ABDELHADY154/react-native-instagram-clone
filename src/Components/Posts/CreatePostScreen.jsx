import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Card } from "react-native-elements";
import { Divider } from "react-native-elements";
import { Input, Button } from "galio-framework";
import * as ImagePicker from "expo-image-picker";

export default class AddPostScreen extends Component {
  state = {
    image: null,
    desc: null,
  };
  uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var filename = uri.replace(/^.*[\\\/]/, "");
    var ref = firebase
      .storage()
      .ref()
      .child("postsImages/" + filename);
    return ref.put(blob);
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
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  AddNewPost = () => {
    const collection = firebase.firestore().collection("posts");
    if (this.state.desc && this.state.image) {
      var post = {
        image: this.state.image.replace(/^.*[\\\/]/, ""),
        desc: this.state.desc,
        userUid: firebase.auth().currentUser.uid,
        createdAt: Date.now(),
      };
      collection
        .add(post)
        .then(res => {
          this.uploadImage(this.state.image).then(() => {
            this.setState({ image: null, desc: null });
            this.props.navigation.push("Home");
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ err: "Please fill all fields" });
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.headers}>Add new Post</Text>
        <Divider
          style={{
            backgroundColor: "black",
            width: "50%",
            height: 1,
            borderRadius: 50,
          }}
        />
        <Text style={styles.previewHeader}>Post Preview</Text>
        <Card
          containerStyle={{
            width: "90%",
            borderRadius: 10,
          }}
        >
          <Card.Image
            source={{ uri: this.state.image }}
            style={{ width: "100%" }}
          ></Card.Image>
          <Card.Divider />
          <Card.Title style={{ textAlign: "left", fontWeight: "normal" }}>
            {this.state.desc}
          </Card.Title>
        </Card>
        <Divider
          style={{
            backgroundColor: "black",
            width: "90%",
            height: 1,
            borderRadius: 50,
            marginTop: 20,
          }}
        />
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
        <Divider
          style={{
            backgroundColor: "black",
            width: "90%",
            height: 1,
            borderRadius: 50,
          }}
        />
        <Input
          placeholder="Add Post Description"
          placeholderTextColor="black"
          rounded
          bgColor="white"
          borderless={true}
          value={this.state.desc}
          onChangeText={val => {
            this.setState({ desc: val });
          }}
          style={{ width: "90%" }}
        />
        <Divider
          style={{
            backgroundColor: "black",
            width: "90%",
            height: 1,
            borderRadius: 50,
          }}
        />
        <Button
          round
          uppercase
          color="info"
          style={{ marginTop: 50 }}
          onPress={this.AddNewPost}
        >
          Add Post
        </Button>
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
  headers: {
    fontWeight: "bold",
    fontSize: 30,
  },
  previewHeader: {
    fontSize: 20,
  },
});
