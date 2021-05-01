import React from "react";
import {
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
const { width } = Dimensions.get("screen");
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


class Articles extends React.Component {
  state = {
    user: false,
    userId: null,
    articles: historyList,
    userInfor: null,
    totalNum: 0,
    exercisesCompleted: articles,
    exercisesToDo: articles,
    reflectiveExercises: [articles[1], articles[2]]
  }

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
        historyList = null
      }
    })
  }


  compareWithArticalURL = async () => {
    firebase.database().ref('ArticleURL').on('value', async (snapshot) => {
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
      this.setState({ totalNum: totalNum })
      this.setState({ completedNum: completedNum })
      this.setState({ exercisesCompleted: historyList == null ? articles : historyList })
      this.setState({
        exercisesToDo: urlList.filter(item => {
          for (let j = 0; j < historyList.length; j++) {
            if (item.URL == historyList[j].URL) {
              return false
            }
          }
          return true
        })
      })
    })
  }





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

  componentWillUnmount() {
    let userId = this.state.userId
    firebase.database().ref('user-complete/' + userId).off()
  }

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
            {'\nCompleted Modules:'}
          </Text>
          <Block flex row>
            <FlatList data={this.state.exercisesCompleted}
              renderItem={({ item }) => <Card item={item} horizontal />}
              keyExtractor={(item, index) => index.toString()}>
            </FlatList>
          </Block>

        </Block>
      </ScrollView>
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
