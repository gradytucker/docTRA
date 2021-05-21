{/*THIS IS THE TRAINING COMPLETED PAGE

on this page is a full list of all exercises that the user has completed, 
in a flatlist format for the user to scroll down to.
the users are able to see and keep track of all the exercises they have completed
thus far. from here they are able to redo exercises if they so choose.


*/}

import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants";
import { Card } from "../components";
import { Button } from "../components";
import { color } from "react-native-reanimated";
import ProgressCircle from 'react-native-progress-circle'
const { width } = Dimensions.get("window");
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
var completedNum = 0;
var totalNum = 0;
var historyList = null;
var incompleteList = null;
var userInfor = null;
var key_count = 0;
var totalNum = 0;
var moduleList = null;

class Articles extends React.Component {
  state = {
    user: false,
    userId: null,
    articles: historyList,
    userInfor: null,
    totalNum: 0,
    exercisesCompleted: [],
    exercisesToDo: articles,
  }

  /* FETCH HISTORY LIST FROM DATABASE */
  fetchHistory = async () => {
    historyList = null
    totalNum = 0;
    completedNum = 0
    let userId = firebase.auth().currentUser.uid
    //set value event listener
    await firebase.database().ref('user-complete/' + userId).on('value', async (snapshot) => {
      if (snapshot.exists()) {
        historyList = snapshot.val()
        await this.compareWithArticalURL()
      } else {
        historyList = null
      }
    })
  }

  /* COMPARE HISTORY LIST WITH MODULES  */
  compareWithArticalURL = async () => {
    let userId = firebase.auth().currentUser.uid
    //set value event listener
    firebase.database().ref('user-modules/' + userId).on('value', async (snapshot) => {
      const urlList = snapshot.val()
      totalNum = 0
      completedNum = 0

      //get the total number for all modules
      for (let i = 1; i < urlList.length; i++) {
        totalNum++
      }

      //get the complete data and complete number
      historyList = urlList.filter(item => {
        for (let i = 0; i < historyList.length; i++) {
          if (item.URL == historyList[i].url) {
            completedNum++;
            return true
          }
        }
        return false;
      });

      //get the TO DO modules data
      moduleList = urlList.filter(item => {
        for (let j = 0; j < historyList.length; j++) {
          if (item.URL == historyList[j].URL) {
            return false
          }
        }
        return true
      });

      this.setState({ totalNum: totalNum })
      this.setState({ completedNum: completedNum })
      this.setState({ exercisesCompleted: historyList == null ? null : historyList })
      this.setState({ exercisesToDo: moduleList })
    })
  }


  /* FIREBASE FETCH */
  firebaseFetch = firebase.auth().onAuthStateChanged(async user => {
    if (user != null) {
      this.state.userId = firebase.auth().currentUser.uid
      await this.fetchHistory()
    }
  })

  /* MOUNT */
  componentDidMount() {
    this.firebaseFetch()
  }

  /* UNMOUNT */
  componentWillUnmount() {
    let userId = this.state.userId
    firebase.database().ref('user-complete/' + userId).off()
    firebase.database().ref('user-modules/' + userId).off()
  }

  /* SHOW ALL COMPLETED CARDS IN FLATLIST FORMAT */
  renderCards = () => {
    return (
      <View style={styles.articles}>
        <Block flex>
          <StatusBar
            barStyle="dark-content"     // dark-content, light-content and default
            hidden={false}  //To hide statusBar
            backgroundColor="#ff4081"   //Background color of statusBar
            translucent={false}     //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
          <Text bold size={28} color="#32325D">
            {'\nCompleted Modules:'}
          </Text>
          {this.state.exercisesCompleted.length != 0 ?
            <Block flex row>
              <FlatList data={this.state.exercisesCompleted}
                renderItem={({ item }) => <Card item={item} horizontal />}
                keyExtractor={(item, index) => index.toString()}>
              </FlatList>
            </Block>
            : <Block center style={styles.productImage}>
              <Image
                style={styles.productImage}
                source={require('../assets/imgs/startExercisesIMG.png')}
              />
            </Block>}
        </Block>
      </View>
    )
  }


  /* RENDER SCREEN */
  render() {
    return (
      <Block flex center>
        <FlatList ListHeaderComponent={this.renderCards()}>
        </FlatList>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  trainingButton: {
    backgroundColor: theme.COLORS.MUTED,
    color: theme.COLORS.BLACK
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  articles: {
    maxWidth: 800,
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: 0, //draft
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productImage: {
    alignSelf: "center",
    borderRadius: 3,
    opacity: 0.5,
    maxWidth: (500) * 0.9,
    maxHeight: (228) * 0.9,
    width: (cardWidth - theme.SIZES.BASE) * 0.9,
    height: (cardWidth - theme.SIZES.BASE - 200) * 0.9,
    resizeMode: 'contain'
  },
  productImage: {
    borderRadius: 3,
    opacity: 0.5,
    width: (cardWidth - theme.SIZES.BASE) * 0.9,
    height: (cardWidth - theme.SIZES.BASE - 200) * 0.9,
    alignSelf: "center",
    resizeMode: 'contain'
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Articles;
