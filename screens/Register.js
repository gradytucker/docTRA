import React, { useState, useEffect } from 'react';
import firebase from "firebase"
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import Home from "../screens/Home";
//import {GoogleSignIn} from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth'

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("window");

const config = {
  iosClientId: "813152005106-phlioohd71j6jpc6c148elppopi3686g.apps.googleusercontent.com",
  androidClientId: "813152005106-0l5cs7ibnuv5vp28jbqefd7dm8r9aimu.apps.googleusercontent.com",
  scopes: ['profile', 'email'],
}

var loginErrorMessage = "";


class Register extends React.Component {

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync(config);

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  userCheckIn = () => {
    let unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.state.hasUser = true
        this.props.navigation.navigate("App")
      } else {
        this.state.hasUser = false
      }
    })
    unsubscribe()
  }

  onSignIn = googleUser => {
    console.log("google Auth Response", googleUser)
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe()
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken, googleUser.accessToken)
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(() => {
          console.log("user sign in")
          firebase.database().ref('user-information/' + firebase.auth().currentUser.uid).set({
            familyName: googleUser.user.familyName,
            givenName: googleUser.user.givenName,
            name: googleUser.user.name,
            email: googleUser.user.email,
            photoUrl: googleUser.user.photoUrl
          })
          this.props.navigation.navigate("App");
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
        this.props.navigation.navigate("App");
      }
    }
    );
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  isHasUser = (firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.EmailAuthProvider.PROVIDER_ID) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  // componentDidUpdate(prevState){
  //   if (this.state.hasUser != prevState.hasUser){
  //     this.isHasUser();
  //   }
  // }
  // user state
  state = {
    user: null,
    name: "Tester",
    email: "",
    password: "123456",
    hasUser: false,
    loginErrorMessage
  }

  signUpAccount = () => {
    let email = this.state.email + "@tester.com"
    let password = this.state.password
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      this.props.navigation.navigate("App");
      console.log("Success")
      loginErrorMessage = " "
      this.setState({ loginErrorMessage: loginErrorMessage })
      // ...
    })
      .catch((error) => {
        console.log("error")
        loginErrorMessage = "Something went wrong. Try again."
        this.setState({ loginErrorMessage: loginErrorMessage })
      });
  }

  componentDidMount() {
    this.userCheckIn()
  }

  componentWillUnmount() { }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
        <StatusBar
          barStyle="dark-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor="#ff4081"
          //Background color of statusBar
          translucent={false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <ImageBackground
          source={Images.ProfileBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text bold size={26} color="#32325D" >
                  {"\nWelcome to docTRA"}
                </Text>

              </Block>

              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    sign up with ID
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="ID"
                        multiline={false}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        // change the state value when input information
                        onChangeText={text => {
                          this.setState({ email: text });
                        }}
                        value={this.state.email}
                      // emailTest = {
                      //   console.log(this.state.email)
                      // }
                      />
                    </Block>
                    <Block row width={width * 0.75}>
                    </Block>
                    <Block middle>
                      {/* sign in button */}
                      <Button color="success" style={styles.createButton} onPress={this.signUpAccount}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Log In
                        </Text>
                      </Button>
                      <Text color="red" size={16}>{"\n"}  {loginErrorMessage}</Text>
                      <Block flex middle>
                        <Block flex middle>
                          <Button style={styles.socialButtons} onPress={() => {
                            this.signInWithGoogleAsync();
                          }

                          }>
                            <Block row>
                              <Icon
                                name="logo-google"
                                family="Ionicon"
                                size={14}
                                color={"black"}
                                style={{ marginTop: 2, marginRight: 5 }}
                              />
                              <Text style={styles.socialTextButtons}>GOOGLE</Text>
                            </Block>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.675,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 10
  }
});

export default Register;
