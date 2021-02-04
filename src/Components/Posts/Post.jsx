import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
export default class Post extends Component {
  state = {
    image: null,
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

  componentDidMount() {
    this.getImage(this.props.imageName);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          containerStyle={{ width: "90%" }}
          onPress={() => {
            this.props.nav.push("show", {
              docId: this.props.docId,
            });
          }}
        >
          <Card
            containerStyle={{
              width: "90%",
              borderRadius: 10,
              marginLeft: 15,
            }}
          >
            <Card.Image
              source={{ uri: this.state.image }}
              style={{ width: "100%" }}
            ></Card.Image>
            <Card.Divider />
            <Card.Title style={{ textAlign: "left", fontWeight: "normal" }}>
              {this.props.desc}
            </Card.Title>
          </Card>
        </TouchableOpacity>
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
