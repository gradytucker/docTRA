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

const { width, height } = Dimensions.get("screen");

const config = {
  iosClientId: "813152005106-phlioohd71j6jpc6c148elppopi3686g.apps.googleusercontent.com",
  androidClientId: "813152005106-0l5cs7ibnuv5vp28jbqefd7dm8r9aimu.apps.googleusercontent.com",
  scopes: ['profile', 'email'],
}

class Register extends React.Component {

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

  onSignIn = googleUser => {
    console.log("google Auth Response",googleUser)
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe()
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken,googleUser.accessToken)
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(() => {
          console.log("user sign in")
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
  

  //user sign out when app reopen
  init = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  // componentDidUpdate(prevState){
  //   if (this.state.hasUser != prevState.hasUser){
  //     this.isHasUser();
  //   }
  // }

  //check the user state
  isHasUser = () => {
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        console.log("has user")
        this.props.navigation.navigate('Home')
      }
      else{
        console.log("no user")
      }
    })
  }
  
  // create an account on firebase with email and password
  createAccount = () =>{
    let email = this.state.email
    let password = this.state.password
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      
      console.log("created")
    })
    .catch((error) => {
      console.log("error")
    });
    this.isHasUser()
  }
  // sign up using email and password
  signUpAccount = () =>{
    let email = this.state.email
    let password = this.state.password
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("Success")
    // ...
    })
    .catch((error) => {
    console.log("error")
    });
    this.isHasUser();
  }
  // google sign in init
  initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: '813152005106-ett0igen5ivu4f108kl11mkh4n18nrto.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };
  //check the user state
  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };
  //google account sign out
  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };
  //google account sign in 
  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  // user state
  state = {
    user: null,
    name:"",
    email: "admin@123.com",
    password:"123456",
    hasUser: false
  }
  render() {
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
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons} onPress = {() => {
        
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
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
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
                        placeholder="Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        // change the state value when input information
                        onChangeText={text => {
                          this.setState({ name: text });
                        }}
                        value = {this.state.name}
                        // NameTest = {
                        //   console.log(this.state.name)
                        // }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        multiline={false}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        // change the state value when input information
                        onChangeText={text => {
                          this.setState({ email: text });
                        }}
                        value = {this.state.email}
                        // eamilTest = {
                        //   console.log(this.state.email)
                        // }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
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
                          this.setState({ password: text });
                        }}
                        value = {this.state.password}
                        // passwordTest = {
                        //   console.log(this.state.password)
                        // }
                      />
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block>
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      {/* create account button */}
                    <Button color="primary" style={styles.createButton} onPress = {this.createAccount}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                        {/* sign in button */}
                    </Button >
                    <Button color="success" style={styles.createButton} onPress = {this.signUpAccount}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                         Sign Up
                        </Text>
                    </Button>
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
    height: height * 0.875,
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
