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

  userCheckIn = () =>{
    firebase.auth().onAuthStateChanged(user => {
      if(user != null){
        this.state.hasUser = true
        this.props.navigation.navigate("App")
      }
    })
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
          firebase.database().ref('user-information/'+ firebase.auth().currentUser.uid).set({
            familyName: googleUser.user.familyName,
            givenName: googleUser.user.givenName,
            name: googleUser.user.name,
            eamil:googleUser.user.email,
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
  
  // componentDidUpdate(prevState){
  //   if (this.state.hasUser != prevState.hasUser){
  //     this.isHasUser();
  //   }
  // }
  // user state
  state = {
    user: null,
    name:"",
    email: "admin@123.com",
    password:"123456",
    hasUser: false
  }

  componentDidMount(){
    this.userCheckIn()
  }


  render() {
    const {navigation} = this.props;
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
                <Text color="#ff8282" size={14}>
                  Welcome to docTRA
                </Text>
                <Block flex middle>
                  <Button style={{ ...styles.socialButtons}}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={20}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Block flex middle>
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
              </Block>
              <Block flex>
                <Block flex center>
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
