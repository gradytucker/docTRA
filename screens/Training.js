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
import { Card } from "../components/";
import { Button } from "../components";
import { color } from "react-native-reanimated";
import firebase from "firebase";
import ProgressCircle from 'react-native-progress-circle'
import articleList from "../constants/articles";
const { width } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
var completedNum = 0;
var totalNum = 0;
var historyList = null;
var exerciseCompleted = null;
var exerciseToDoGather = [];
var exerciseList = null;
var userInfor = null;
var key_count = 0;



async function fetchUserInformation() {
  var completedNum = 0;
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
  await firebase.database().ref('user-complete/' + userId).get().then(async function (snapshot) {
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

  })
}


class Articles extends React.Component {
  state = {
    user: false,
    articles: historyList,
    userInfor: null,
    totalNum: 0,
    exercisesCompleted: articles,
    exercisesToDo: exerciseToDoGather,
    reflectiveExercises: [articles[1], articles[2]]
  }

  componentDidMount() {
    var totalNum = 0;
    firebase.auth().onAuthStateChanged(async user => {
      if (user != null) {
        await history()
        await fetchUserInformation()
        this.setState({ userInfor: userInfor })
        this.setState({ articles: historyList==null ? articles : historyList })
        this.setState({ totalNum: totalNum })
        this.setState({ completedNum: completedNum })
        this.setState({ exercisesCompleted: historyList==null ? articles : historyList })
        this.setState({ exercisesToDo: exercisesToDoGather })
      }
    })
  }

  componentWillUnmount(){}

  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate("WebViewScreen", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productPrice}
            >
              {item.price}
            </Text>
            <Text center size={34}>
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.description}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

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
            {'\nModules Completed:\n'}
          </Text>
          <Block flex center>
            <ProgressCircle
              percent={((completedNum / totalNum) * 100)}
              radius={80}
              borderWidth={20}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{((completedNum / totalNum) * 100) + '%'}</Text>
            </ProgressCircle>
            <Text style={{ fontSize: 18 }}>{'\n' + (totalNum - completedNum) + ' modules remaining!'}</Text>
          </Block>
          <Text bold size={20} color="#32325D">
            {'\n\nModules to do:'}
          </Text>
          <View style={styles.articles}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.state.exercisesToDo.length != 0 ?
                <Block flex row>
                  {this.state.exercisesToDo.map((w) => {
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
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Block flex row>
                {this.state.exercisesCompleted.map((w) => {
                  return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
                })}
              </Block>
            </ScrollView>
          </View>
          <Button small
            style={styles.trainingButton}
            onPress={() => navigation.navigate("TrainingCompleted")}
          >{"View all >"}</Button>
          <Text bold size={20} color="#32325D">
            {'\n\nReflective Exercises:'}
          </Text>
          <View style={styles.articles}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Block flex row>
                {this.state.reflectiveExercises.map((w) => {
                  return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
                })}
              </Block>
            </ScrollView>
          </View>
          <Button small
            style={styles.trainingButton}
            onPress={() => navigation.navigate("TrainingReflective")}
          >{"View all >"}</Button>
          <Text bold size={20} color="#32325D">
            {'\n'}
          </Text>
        </Block>
      </ScrollView >
    )
  }



  render() {
    return (
      <Block flex center>
        <ScrollView
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
    borderRadius: 3,
    width: (cardWidth - theme.SIZES.BASE - 50) * 0.8,
    height: (cardWidth - theme.SIZES.BASE - 200) * 0.8,
    alignSelf: "center"
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
