import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "../../Firebase/FireBaseConfig";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Post from "./Post";
export default class AllPosts extends Component {
  constructor() {
    super();
    this.state = {
      displayName: null,
      image: null,
      uid: null,
      posts: [],
      count: 0,
    };
    this.posts = [];
  }

  async componentDidMount() {
    var postsArr = [];
    const collection = firebase.firestore().collection("posts").get();
    const posts = collection;
    posts
      .then(res => {
        res.forEach(async doc => {
          var d = doc.data();
          d["id"] = doc.id;
          postsArr.push(d);
        });
        const sortedPosts = postsArr.sort((a, b) => b.createdAt - a.createdAt);
        this.setState({ posts: sortedPosts });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <ScrollView style={{ width: "100%" }}>
          {this.state.posts ? (
            this.state.posts.map(item => {
              return (
                <Post
                  key={item.image}
                  desc={item.desc}
                  imageName={item.image}
                  nav={navigation}
                  docId={item.id}
                />
              );
            })
          ) : (
            <Text></Text>
          )}
        </ScrollView>
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
