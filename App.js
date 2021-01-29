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
import { firebase } from "./src/Firebase/FireBaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    isLoading: false,
    userData: {},
    user: {},
  };
  SignIn = props => {
    const navigation = useNavigation();
    const loggedIn = async userData => {
      this.setState({
        isLoggedIn: true,
        userData: userData,
        user: await AsyncStorage.getItem("userData"),
      });
    };
    return (
      <SignInScreen {...props} navigation={navigation} signIn={loggedIn} />
    );
  };
  SignUp = props => {
    const navigation = useNavigation();

    const register = async Data => {
      this.setState({
        isLoggedIn: true,
        userData: Data,
        user: await AsyncStorage.getItem("userData"),
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
    console.log(this.state.user);
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
