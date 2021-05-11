{/*THIS IS THE PROFILE PAGE

on this page features the users profile info.
mainly their name, the number of exercises completed, and 
a list of all exercises completed.
due to an adherence to a level of privacy, not much else
data is stored to be displayed for the user.

this page also features a logout button if the user chooses
to do so.


*/}


import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform, View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Card } from "../components";

import { Button } from "../components";
import { Images, articles, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import firebase from "firebase"
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
var historyList = null
var oldList = null
var newList = null
var userInfor = null
var completedNum = 0;

/* FETCH USER INFORMATION FROM DATABASE */
async function fetchUserInformation() {
  var completedNum = 0;
  let userID = firebase.auth().currentUser.uid
  await firebase.database().ref('user-information/' + userID).once("value").then(snapshot => {
    userInfor = snapshot.val()
    return userInfor
  })

}


class Profile extends React.Component {

  state = {
    user: false,
    userId: null,
    articles: historyList,
    userInfor: null
  }

  /* FETCH HISTORY FROM DATABASE */
  fetchHistory = async () => {
    let userId = firebase.auth().currentUser.uid
    firebase.database().ref('user-complete/' + userId).on('value', async (snapshot) => {
      if (snapshot.exists()) {
        historyList = snapshot.val()
        await this.compareWithArticalURL()
      } else {
        historyList = null
      }
    })
  }

  /* COMPARE HISTORY FROM MODULES FROM DATABASE */
  compareWithArticalURL = async () => {
    await firebase.database().ref('ArticleURL').get().then((snapshot) => {
      let urlList = snapshot.val()
      historyList = urlList.filter(item => {
        for (let i = 0; i < historyList.length; i++) {
          if (item.URL == historyList[i].url) {
            return true
          }
        }
        return false
      });

      this.setState({ articles: historyList })
      completedNum = historyList == null ? 0 : historyList.length
      this.setState({ articles: historyList == null ? articles : historyList })
    })
  }

  /* FIREBASE FETCH */
  firebaseFetch = firebase.auth().onAuthStateChanged(async user => {
    if (user != null) {
      await this.fetchHistory()
      await fetchUserInformation()
      this.setState({ userInfor: userInfor })
    }
  })

  /* SIGN OUT FUNCTION */
  signOut = () => {
    this.state.userId = firebase.auth().currentUser.uid
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate("Account");
    }).catch((error) => {
      console.log("error on sign out")
    });
  }

  /* MOUNT */
  componentDidMount() {
    this.firebaseFetch()
  }

  componentDidUpdate() { }

  /* UNMOUNT */
  componentWillUnmount() {
    let userId = this.state.userId
    completedNum = 0
    historyList = null
    firebase.database().ref('user-complete/' + userId).off()
  }

  /* SHOW CARDS FROM HISTORY LIST (COMPLETED EXERCISES) */
  renderCards = () => {
    return (
      <View style={styles.articles}>
        <FlatList data={this.state.articles == null ? null : this.state.articles}
          renderItem={({ item }) => <Card item={item} horizontal />}
          keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    );
  };

  /* RENDER PROFILE SCREEN */
  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <FlatList ListHeaderComponent={
              <View style={{ width, marginTop: '30%' }}>

                <Block flex style={styles.profileCard}>
                  <Block middle style={styles.avatarContainer}>
                    {/* PROFILE IMAGE */}
                    <Image
                      source={this.state.userInfor == null ? { uri: Images.ProfilePicture } : { uri: this.state.userInfor.photoUrl }}
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={styles.info}>
                    <Block
                      middle
                      row
                      space="evenly"
                      style={{ marginTop: -20, paddingBottom: 24 }}
                    >
                    </Block>
                  </Block>
                  <Block flex>
                    {/* USER NAME */}
                    <Block middle style={styles.nameInfo}>
                      <Text bold size={32} color="#32325D">
                        {this.state.userInfor == null ? "Loading..." : this.state.userInfor.USER_ID}
                      </Text>
                    </Block>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle>
                      {/* SIGN OUT BUTTON */}
                      <Block style={styles.signOut}>
                        <Text bold size={16} color="#FFFFFF" onPress={this.signOut}> {'Sign out'} </Text>
                      </Block>
                      <Block>
                        <Text bold size={22} color="#32325D">
                          {'\nRecently Completed Exercises:\n'}
                        </Text>
                        <Text bold size={16} color="#32325D">
                          {completedNum + ' exercises completed.\n'}
                        </Text>
                        {this.renderCards()}
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </View>
            }></FlatList>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  signOut: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 70,
    marginHorizontal: 0,
    backgroundColor: "#32325D",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 0,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;