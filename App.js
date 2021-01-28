import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Components/MainScreen/SplashScreen";
import HomeScreen from "./src/Components/Home/HomeScreen";
import SignInScreen from "./src/Components/Auth/SignInScreen";
import SignUpScreen from "./src/Components/Auth/SignUpScreen";
import { firebase } from "./src/Firebase/FireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";
import * as Font from "expo-font";
const Stack = createStackNavigator();

// function SignIn(props) {
//   const navigation = useNavigation();
//   // const { signUp } = React.useContext(AuthContext);userSignUp={signUp}
//   return <SignInScreen {...props} navigation={navigation} />;
// }
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isSignout: true,
    fontsLoaded: false,
    userData: {},
  };
  SignIn = props => {
    const navigation = useNavigation();
    const loggedIn = userData => {
      this.setState({ isLoggedIn: true, userData: userData });
    };
    return (
      <SignInScreen {...props} navigation={navigation} signIn={loggedIn} />
    );
  };
  SignUp = props => {
    const navigation = useNavigation();

    const register = Data => {
      this.setState({ isLoggedIn: true, userData: Data });
    };
    return (
      <SignUpScreen {...props} navigation={navigation} registered={register} />
    );
  };
  async loadFonts() {
    await Font.loadAsync({
      insta: require("./src/Assets/Fonts/Billabong.ttf"),
    });
  }
  componentDidMount() {
    this.loadFonts();

    setTimeout(() => {
      this.setState({ fontsLoaded: true });
    }, 3000);
  }

  render() {
    if (!this.state.fontsLoaded == true) {
      return <SplashScreen />;
    }
    console.log(this.state.userData);
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLoggedIn == false ? (
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
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => {
                  "none";
                },
              }}
            />
          )}
        </Stack.Navigator>
        <StatusBar style="dark" />
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
