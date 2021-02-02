import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Components/MainScreen/SplashScreen";
import HomeScreen from "./src/Components/Home/HomeScreen";
import SignInScreen from "./src/Components/Auth/SignInScreen";
import SignUpScreen from "./src/Components/Auth/SignUpScreen";
import ShowPost from "./src/Components/Posts/ShowPost";
import { firebase } from "./src/Firebase/FireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isSignout: true,
    fontsLoaded: false,
    isLoading: false,
    userData: {},
    user: {},
  };
  Home = props => {
    const navigation = useNavigation();
    const loggedOut = async userData => {
      this.setState({
        isLoggedIn: false,
        userData: userData,
        isLoading: true,
      });
    };
    return (
      <HomeScreen
        {...props}
        navigation={navigation}
        signOut={loggedOut}
        logIn={this.state.userData}
      />
    );
  };
  postShow = props => {
    const navigation = useNavigation();
    // const loggedOut = async userData => {
    //   this.setState({
    //     isLoggedIn: false,
    //     userData: userData,
    //     isLoading: true,
    //   });
    // };
    return <ShowPost {...props} navigation={navigation} />;
  };
  SignIn = props => {
    const navigation = useNavigation();
    const loggedIn = async userData => {
      this.setState({
        isLoggedIn: true,
        userData: userData,
      });
    };
    return (
      <SignInScreen {...props} navigation={navigation} signIn={loggedIn} />
    );
  };
  SignUp = props => {
    const navigation = useNavigation();

    const register = async userData => {
      this.setState({
        isLoggedIn: true,
        userData: userData,
      });
    };
    return (
      <SignUpScreen {...props} navigation={navigation} registered={register} />
    );
  };
  async loadFonts() {
    await Font.loadAsync({
      insta: require("./src/Assets/Fonts/Billabong.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }
  async componentDidMount() {
    this.loadFonts();
    setTimeout(() => {
      this.setState({ isLoading: true });
    }, 2000);
  }

  render() {
    if (!this.state.fontsLoaded == true) {
      return <ActivityIndicator size="large" color="#E14D47" />;
    }
    if (!this.state.isLoading == true) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {firebase.auth().currentUser == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={this.SignIn}
                options={{
                  header: () => {
                    "none";
                  },
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={this.SignUp}
                options={{
                  header: () => {
                    "none";
                  },
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={this.Home}
                options={{
                  header: () => {
                    "none";
                  },
                }}
              />
              <Stack.Screen
                name="show"
                component={this.postShow}
                options={{
                  headerTitle: () => {
                    "none";
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
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
