{/*THIS IS THE HOME PAGE

on this page features the a welcome greeting banner, 
and various general content for the user to explore.
we have a randomised daily quote, a cartoon, 
and some random exercises from the users to do list
as a queue for them to start a new exercise quickly.


*/}

import React from 'react';
import { StyleSheet, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Block, Text, Button, theme } from "galio-framework";
import { Card } from '../components';
import articles from '../constants/articles';
import { Images } from '../constants';
const { height, width } = Dimensions.get('screen');
import firebase from 'firebase'
import Articles from './Training';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


{/* custom time-based greeting */ }
const now = new Date().getHours();
var message = "hello";
var key_count = 0;
if (now < 12) {
  message = '\nGood Morning!\nHere are some activities:';
} else if (now >= 12 && now <= 17) {
  message = '\nGood Afternoon!\nHere are some activities:';
} else if (now >= 17 && now <= 24) {
  message = '\nGood Evening!\nHere are some activities:';
}

var completedNum = 0;
var totalNum = 0;
var historyList = null;
var incompleteList = null;
var userInfor = null;
var key_count = 0;
var totalNum = 0;
var moduleList = null;
var newArticleList = null;
const cardWidth = width - theme.SIZES.BASE * 2;



class Home extends React.Component {


  state = {
    user: false,
    userId: null,
    userName: null,
    articles: historyList,
    userInfor: null,
    totalNum: 0,
    exercisesCompleted: articles,
    exercisesToDo: [],
    reflectiveExercises: [articles[1], articles[2]]
  }

  get_random = (list) => {
    return list[Math.floor((Math.random() * list.length))];
  }


  /* FETCH MODULES LIST FROM DATABASE */
  fetchModulesToDo = async () => {
    let userId = firebase.auth().currentUser.uid
    firebase.database().ref('user-modules/' + userId).on('value', async (snapshot) => {
      // if the user is not the first time login, just fetch data under the relevant path 
      if (snapshot.exists()) {
        moduleList = snapshot.val()
        moduleList.shift()
        totalNum = moduleList.length
        this.setState({ exercisesToDo: moduleList })
      } else {
        // if the user is the first time login, assign the data to the relevant path.
        // data structure: {user_id: Array[article list]}
        await firebase.database().ref('ArticleURL').get().then(function (snapshot) {
          newArticleList = snapshot.val()
        })
        await firebase.database().ref('user-modules/' + firebase.auth().currentUser.uid).set(newArticleList)
        newArticleList.shift()
        this.setState({ exercisesToDo: newArticleList })
      }
    })
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

  /* FETCH HISTORY LIST TO MODULES FROM DATABASE */
  compareWithArticalURL = async () => {
    let userId = firebase.auth().currentUser.uid
    //set value event listener
    firebase.database().ref('user-modules/' + userId).on('value', async (snapshot) => {
      // if the user is not the first time login, just fetch data under the relevant path 
      if (snapshot.exists()) {
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
      }
    })
  }

  /* FIREBASE FETCH */
  firebaseFetch = firebase.auth().onAuthStateChanged(async user => {
    if (user != null) {
      this.state.userId = firebase.auth().currentUser.uid
      this.state.userName = firebase.auth().currentUser.USER_ID
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

  /* RENDER T.O.D GREETING, DAILY QUOTE, CARTOON, EXERCISE QUEUE  */
  renderArticles = () => {
    const { navigation } = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        {this.state.userId == "9Mz7v0DN5YOWlB6s0W4CpYcT0JJ3" ?
          <Block >
            <Block style={styles.signOut}>
              <Text bold size={16} color="#FFFFFF" onPress={() => navigation.navigate("AdminDashboard")}> {'GO TO ADMIN DASHBOARD'} </Text>
            </Block>
            <Block style={styles.divider}>
              <Text bold size={16} color="#000000" > {'          '} </Text>
            </Block>
          </Block>
          : <Text></Text>}
        <Text bold size={28} color="#32325D">
          {message}
        </Text>

        <Block flex>
          <StatusBar
            barStyle="dark-content"     // dark-content, light-content and default
            hidden={false}  //To hide statusBar
            backgroundColor="#ff4081"   //Background color of statusBar
            translucent={false}     //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
          <Text bold size={20} color="#32325D">
            {'\n\nDaily quote'}
          </Text>
          <TouchableWithoutFeedback disabled={true}>
            <Card item={articles[0]} none keyExtractor={(item, index) => index.toString()} />
          </TouchableWithoutFeedback>
          <Text bold size={20} color="#32325D"> {'\nCompassion Cartoon'}
          </Text>
          <Block>
            <Image
              source={Images.compassionCartoon}
              style={styles.cartoon}
            />
          </Block>
          <Text bold size={20} color="#32325D">
            {'\nExercises for you'}
          </Text>
          {this.state.exercisesToDo.length != 0 ?
            <Block>
              <Block flex row>
                {this.state.exercisesToDo.slice(0, 2).map((w) => {
                  return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
                })}
              </Block>
              <Block flex row>
                {this.state.exercisesToDo.slice(2, 4).map((w) => {
                  return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
                })}
              </Block>
            </Block>
            : <Block flex row>
              <Image
                style={styles.productImage}
                source={require('../assets/imgs/exerciseCompletedIMG.png')}
              />
            </Block>}

        </Block>
      </ScrollView>
    )
  }

  /* RENDER SCREEN */
  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  signOut: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 40,
    marginHorizontal: 0,
    backgroundColor: "#32325D",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  divider: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    marginHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: 0, //draft
  },
  productImage: {
    borderRadius: 3,
    opacity: 0.5,
    width: (cardWidth - theme.SIZES.BASE) * 0.9,
    height: (cardWidth - theme.SIZES.BASE - 200) * 0.9,
    alignSelf: "center"
  },
  cartoon: {
    flex: 1,
    width: width * 0.9,
    height: width,
    resizeMode: "contain"
  },
});

export default Home;
