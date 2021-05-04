{/*THIS IS THE TRAINING TO DO PAGE

on this page is a full list of all exercises that the user has yet to complete, 
in a flatlist format for the user to scroll down to.
the users are able to see and keep track of all the exercises they have yet to complete
thus far. from here they are able to start exercises if they so choose.


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
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "../components";
import { color } from "react-native-reanimated";
import ProgressCircle from 'react-native-progress-circle'
const { width } = Dimensions.get("screen");

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
    exercisesCompleted: articles,
    exercisesToDo: null,
    reflectiveExercises: [articles[1], articles[2]]
  }

  /* FETCH MODULES LIST FROM DATABASE */
  fetchModulesToDo = async () => {
    let userId = firebase.auth().currentUser.uid
    firebase.database().ref('user-modules/' + userId).on('value', async (snapshot) => {
      moduleList = snapshot.val()
      moduleList.shift()
      totalNum = moduleList.length
      this.setState({ exercisesToDo: moduleList })
    })
  }

  /* FETCH HISTORY LIST FROM DATABASE */
  fetchHistory = async () => {
    historyList = null
    totalNum = 0;
    completedNum = 0
    let userId = firebase.auth().currentUser.uid
    await firebase.database().ref('user-complete/' + userId).on('value', async (snapshot) => {
      if (snapshot.exists()) {
        historyList = snapshot.val()
        await this.compareWithArticalURL()
      } else {
        await this.fetchModulesToDo()
        historyList = null
      }
    })
  }

  /* FETCH HISTORY LIST TO MODULES FROM DATABASE */
  compareWithArticalURL = async () => {
    let userId = firebase.auth().currentUser.uid
    firebase.database().ref('user-modules/' + userId).on('value', async (snapshot) => {
      const urlList = snapshot.val()
      totalNum = 0
      completedNum = 0
      
      for (let i = 1; i < urlList.length; i++) {
        totalNum++
      }
      historyList = urlList.filter(item => {
        for (let i = 0; i < historyList.length; i++) {
          if (item.URL == historyList[i].url) {
            completedNum++;
            return true
          }
        }
        return false;
      });

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


  /* SHOW ALL TO DO EXERCISE CARDS */
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
            {'\nModules To Do:'}
          </Text>
          <Block flex row>
            <FlatList data={this.state.exercisesToDo}
              renderItem={({ item }) => <Card item={item} horizontal />}
              keyExtractor={(item, index) => index.toString()}>
            </FlatList>
          </Block>

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
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
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
