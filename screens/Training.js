{/*THIS IS THE TRAINING PAGE

on this page features a progress ring, and two horizontal lists of exercises:
exercisesCompleted and exercisesToDo. each preview list has 5 cards, and to view
all exercises to do, the user clicks "view all", to see all exercises that are 
either 'to do' or 'done.

the progress ring helps incentivise the user to keep going with their exercises,
visualising their progress.


*/}



import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions, View
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants/";
const allArticles = articles
import { Card } from "../components/";
import { Button } from "../components";
import { color } from "react-native-reanimated";
import firebase from "firebase";
import CircularProgress from "../components/circularprogress";

import articleList from "../constants/articles";
const { width } = Dimensions.get("window");
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

var completedNum = 0;
var totalNum = 0;
var historyList = null;
var moduleList = null;
var incompleteList = null;
var userInfor = null;
var key_count = 0;
var totalNum = 0;


/* FETCH USER INFORMATION FROM DATABASE */
async function fetchUserInformation() {
  var completedNum = 0;
  let userID = firebase.auth().currentUser.uid
  await firebase.database().ref('user-information/' + userID).once("value").then(snapshot => {
    userInfor = snapshot.val()
    return userInfor
  })

}

class Articles extends React.Component {
  state = {
    user: false,
    userId: null,
    articles: historyList,
    userInfor: null,
    totalNum: 0,
    exercisesCompleted: [],
    exercisesToDo: [],
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
        await this.fetchModulesToDo()
        historyList = null
      }
    })
  }

  /* FETCH MODULES TO DO FROM DATABASE */
  fetchModulesToDo = async () => {
    let userId = firebase.auth().currentUser.uid
    //set value event listener
    firebase.database().ref('user-modules/' + userId).on('value', async (snapshot) => {
      moduleList = snapshot.val()
      moduleList.shift()
      totalNum = moduleList.length
      this.setState({ exercisesToDo: moduleList })
    })
  }

  /* COMPARE HISTORY LIST WITH MODULES LIST */
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
      console.log(moduleList)
      this.setState({ totalNum: totalNum })
      this.setState({ completedNum: completedNum })
      this.setState({ exercisesCompleted: historyList == null ? null : historyList })
      this.setState({ exercisesToDo: moduleList })
    })
  }

  /* START FIREBASE FETCH */
  firebaseFetch = firebase.auth().onAuthStateChanged(async user => {
    if (user != null) {
      this.state.userId = firebase.auth().currentUser.uid
      await this.fetchHistory()
      await fetchUserInformation()
      this.setState({ userInfor: userInfor })
    }
  })

  componentDidMount() {
    this.firebaseFetch()
  }

  /* UNMOUNT */
  componentWillUnmount() {
    let userId = this.state.userId
    firebase.database().ref('user-complete/' + userId).off()
    firebase.database().ref('user-modules/' + userId).off()
  }




  /* SHOW ALL REQUIRED CARDS ON SCREEN */
  renderCards = () => {
    const { navigation } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>

        <Block flex>
          <StatusBar
            barStyle="dark-content"     // dark-content, light-content and default
            hidden={false}  //To hide statusBar
            backgroundColor="#ff4081"   //Background color of statusBar
            translucent={false}     //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
          <Text bold size={28} color="#32325D">
            {'\nModules Completed:\n\n'}
          </Text>
          <Block flex center>
            <CircularProgress wi percent={isNaN(Math.floor((completedNum / totalNum) * 100)) ? 0 : Math.floor((completedNum / totalNum) * 100)}></CircularProgress>

            <Text style={{ fontSize: 18 }}>{'\n' + (totalNum - completedNum) + ' modules remaining!'}</Text>
          </Block>
          <Text bold size={20} color="#32325D">
            {'\n\nModules to do:'}
          </Text>
          <View style={styles.articles}>
            <ScrollView
              persistentScrollbar={true}
              horizontal={true}
            >
              {/* SHOW EXERCISES TO DO LIST, FIRST 5 ELEMENTS SLICE. IF NO ELEMENTS
              IN LIST, SHOW 'COMPLETION' IMAGE */}
              {this.state.exercisesToDo.length != 0 ?
                <Block flex row>
                  {this.state.exercisesToDo.slice(0, 5).map((w) => {
                    return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
                  })}
                </Block>
                : <Block center style={styles.productImage}>
                  <Image
                    style={styles.productImage}
                    source={require('../assets/imgs/exerciseCompletedIMG.png')}
                  />
                </Block>}
            </ScrollView>
          </View>
          <Button small
            style={styles.trainingButton}
            onPress={() => navigation.navigate("TrainingToDo")}
          >{"View all >"}</Button>
          <Text bold size={20} color="#32325D">
            {'\n\nCompleted Modules:'}
          </Text>
          <View style={styles.articles}>
            <ScrollView
              persistentScrollbar={true}
              horizontal={true}
            >
              {/* SHOW EXERCISESCOMPLETED LIST, FIRST 5 ELEMENTS SLICE. IF NO ELEMENTS
              IN LIST, SHOW 'START EXERCISES' IMAGE */}
              {this.state.exercisesCompleted.length != 0 ?
                <Block flex row>
                  {this.state.exercisesCompleted.slice(0, 5).map((w) => {
                    return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
                  })}
                </Block>
                : <Block center style={styles.productImage}>
                  <Image
                    style={styles.productImage}
                    source={require('../assets/imgs/startExercisesIMG.png')}
                  />
                </Block>}
            </ScrollView>
          </View>
          <Button small
            style={styles.trainingButton}
            onPress={() => navigation.navigate("TrainingCompleted")}
          >{"View all >"}</Button>
          <Text bold size={20} color="#32325D">
            {'\n'}
          </Text>
        </Block>
      </ScrollView >
    )
  }


  /* RENDER SCREEN */
  render() {
    return (
      <Block flex center>
        <ScrollView style={styles.screen}
          showsVerticalScrollIndicator={false}
        >
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  trainingButton: {
    backgroundColor: argonTheme.COLORS.HEADER
  },
  screen: {
    maxWidth: 800
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
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
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
