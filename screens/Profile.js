import React from "react";
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
var userInfor = null
async function fetchUserInformation() {
  let userID = firebase.auth().currentUser.uid
  await firebase.database().ref('user-information/' + userID).once("value").then(snapshot => {
    userInfor = snapshot.val()
    return userInfor
  })

}
async function history() {
      await fetchHistory(firebase.auth().currentUser.uid);
      return historyList
    }
 
  const fetchHistory = async (userId) => {
    await firebase.database().ref('user-history/' + userId).get().then(async function (snapshot) {
      if (snapshot.exists()) {
        historyList = snapshot.val()
        await compareWithArticalURL()
      } else {
        historyList = null
      }
    })
  }

  const compareWithArticalURL = async () => {
    await firebase.database().ref('ArticleURL').get().then(function (snapshot) {
      const urlList = snapshot.val()
      historyList = urlList.filter(item => {
        for (let i = 0; i < historyList.length; i++) {
          if (item.URL == historyList[i].url) {
            return true
          }
        }
        return false
      });
    })
  }


class Profile extends React.Component {

  state = {
    user: false,
    articles: historyList,
    userInfor: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user != null) {
        await history()
        await fetchUserInformation()
        this.setState({ userInfor: userInfor })
        this.setState({ articles: historyList })
      }
    })
  }

  renderCards = () => {
    return (
          <View style = {styles.articles}>
            <FlatList data={this.state.articles == null  ? articles : this.state.articles}  
            renderItem={({ item }) => <Card item={item} horizontal />}
            keyExtractor={(item, index) => index.toString() }>
            </FlatList>
          </View>
    );
  };

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
              <View style={{ width, marginTop: '25%' }}>
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={ this.state.userInfor == null ? {uri: Images.ProfilePicture} : {uri : this.state.userInfor.photoUrl}}
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
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={32} color="#32325D">
                      {this.state.userInfor == null ? "Loading..." : this.state.userInfor.name}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Block>
                      <Text bold size={22} color="#32325D">
                        {'\nRecently Completed Exercises:\n'}
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
    borderWidth: 1,
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