import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Card } from "react-native-elements";
import { Button } from "galio-framework";

export default class ShowPost extends Component {
  state = {
    image: null,
    desc: null,
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
    //   .collection("posts")
    //   .doc(this.props.route.params.docId)
    //   .delete();
    this.props.navigation.push("Home");
  };

  async componentDidMount() {
    const collection = firebase.firestore().collection("posts");
    var doc = collection.doc(this.props.route.params.docId);
    var post = (await doc.get()).data();
    this.getImage(post.image);
    this.setState({ desc: post.desc });
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
