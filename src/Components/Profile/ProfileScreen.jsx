import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Avatar } from "react-native-elements";
import { Button } from "galio-framework";

export default class Profile extends Component {
  state = {
    name: null,
    image: null,
  };
  getImage = async imageName => {
    var ref = await firebase
      .storage()
      .ref()
      .child("profileImages/" + imageName);
    var image = await ref.getDownloadURL();

    this.setState({
      image: image,
    });
    return image;
  };
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
        this.props.loggOut();
      })
      .catch(error => console.log(error));
  };
  async componentDidMount() {
    this.setState({
      name: firebase.auth().currentUser.displayName,
    });
    this.getImage(firebase.auth().currentUser.uid);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size="xlarge"
          />
          <Text style={{ fontSize: 30, marginTop: 20, textAlign: "center" }}>
            {this.state.name}
          </Text>
        </View>
        <Button color="red" round onPress={() => this.signOut()}>
          Log out
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
