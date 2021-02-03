import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Card } from "react-native-elements";
import { Button, Input } from "galio-framework";
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

export default class ShowPost extends Component {
  state = {
    image: null,
    desc: null,
    editPost: false,
    postImageName: null,
    newImage: null,
  };
  cameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({ newImage: result.uri });
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ newImage: result.uri });
    }
  };
  uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var filename = uri.replace(/^.*[\\\/]/, "");
    var ref = firebase
      .storage()
      .ref()
      .child("postsImages/" + filename);
    this.setState({ postImageName: filename });
    return ref.put(blob);
  };
  getImage = async imageName => {
    var ref = await firebase
      .storage()
      .ref()
      .child("postsImages/" + imageName);
    var image = await ref.getDownloadURL();
    this.setState({
      image: image,
    });
    return image;
  };
  deleteDoc = async () => {
    const res = await firebase
      .firestore()
      .collection("posts")
      .doc(this.props.route.params.docId)
      .delete();
    console.log(res);
    this.props.navigation.push("Home");
  };
  editForm = () => {
    this.setState({ editPost: true });
  };
  editPostHandle = () => {
    const collection = firebase
      .firestore()
      .collection("posts")
      .doc(this.props.route.params.docId);
    if (this.state.desc && this.state.image) {
      this.uploadImage(this.state.newImage);
      var post = {
        image: this.state.newImage
          ? this.state.newImage.replace(/^.*[\\\/]/, "")
          : this.state.postImageName,
        desc: this.state.desc,
        userUid: firebase.auth().currentUser.uid,
        createdAt: Date.now(),
      };
      console.log(post);
      collection
        .set(post)
        .then(() => {
          this.props.navigation.push("Home");
        })
        .catch(err => console.log(err));
    } else {
      alert("Please Fill all fields");
    }
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
    const collection = firebase.firestore().collection("posts");
    var doc = collection.doc(this.props.route.params.docId);
    var post = (await doc.get()).data();
    this.setState({ desc: post.desc, postImageName: post.image });
    this.getImage(this.state.postImageName);
  }
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
        {this.state.editPost == false ? (
          <>
            <Card
              containerStyle={{
                width: "90%",
                borderRadius: 10,
                marginLeft: 20,
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
            <View style={{ flexDirection: "row" }}>
              <Button
                onlyIcon
                icon="delete"
                iconFamily="antdesign"
                iconSize={30}
                color="red"
                iconColor="#fff"
                style={{ width: 60, height: 60 }}
                onPress={this.deleteDoc}
              >
                delete
              </Button>
              <Button
                onlyIcon
                icon="edit"
                iconFamily="fontawsome"
                iconSize={30}
                color="success"
                iconColor="#fff"
                style={{ width: 60, height: 60 }}
                onPress={this.editForm}
              >
                Edit
              </Button>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.previewHeader}>Post Preview</Text>
            <Card
              containerStyle={{
                width: "90%",
                borderRadius: 10,
              }}
            >
              <Card.Image
                source={
                  this.state.newImage
                    ? { uri: this.state.newImage }
                    : { uri: this.state.image }
                }
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

            <Button
              round
              uppercase
              color="info"
              style={{ marginTop: 50 }}
              onPress={this.editPostHandle}
            >
              Save Post
            </Button>
            <Button
              onlyIcon
              icon="close"
              iconFamily="fontawsome"
              iconSize={30}
              color="red"
              iconColor="#fff"
              style={{ width: 60, height: 60 }}
              onPress={() => {
                navigation.push("show", {
                  docId: this.props.route.params.docId,
                });
              }}
            >
              Edit
            </Button>
          </>
        )}
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
