import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  RecyclerViewBackedScrollViewComponent
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { Images, argonTheme } from "../constants";
import FAQresponses from '../constants/FAQresponses';
import { Card } from "../components";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";
import articleList from "../constants/articles";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
var userList = []
var userUsage = null;
var userUsageWithFullData = [];
var allArticleData = []
var exerciseFeedback = [];
class Articles extends React.Component {

  state = {
    userList: null,
    userUsage: null,
    userUsageWithFullData: null,
    exerciseFeedback: null,
  }

  compareAndMatchArticalData = async (userUsage) => {
    await firebase.database().ref('ArticleURL').get().then((snapshot) => {
      allArticleData = snapshot.val()
    })

    for (let i in userUsage) {
      userUsageWithFullData.push([i, userUsage[i]])
    }

    for (let i in userUsageWithFullData) {
      userUsageWithFullData[i][1] = allArticleData.filter(item => {
        for (let j = 0; j < userUsageWithFullData[i][1].length; j++) {
          if (item.URL == userUsageWithFullData[i][1][j].url) {
            return true
          }
        }
        return false
      })
      
      for(let j in this.state.exerciseFeedback){
        if(this.state.exerciseFeedback[j][0] == userUsageWithFullData[i][0]){
          userUsageWithFullData[i].push(this.state.exerciseFeedback[j][1])
        }
      }
    }
    this.setState({ userUsageWithFullData: userUsageWithFullData })
  }

  fetchUserComment = async () => {
    let dataList = null
    exerciseFeedback = []
    firebase.database().ref('exercise-rating').on('value', snapshot => {
      if (snapshot.exists()) {
        dataList = snapshot.val()
        for(let i in dataList){
          exerciseFeedback.push([i,dataList[i]])
        }
        this.setState({ exerciseFeedback: exerciseFeedback})
      }
    })
  }

  fetchAllUserInformation = async () => {
    await firebase.database().ref('user-information').once("value").then(snapshot => {
      let dataList = snapshot.val()
      for (let i in dataList) {
        userList.push([i, dataList[i].name, dataList[i].USER_ID])
      }
    })
    this.setState({ userList: userList })
  }

  fetchAllUserUsage = async () => {
    firebase.database().ref('user-complete').on('value', snapshot => {
      if (snapshot.exists()) {
        userUsage = snapshot.val()
        this.setState({ userUsage: userUsage })
        this.compareAndMatchArticalData(userUsage)
      } else {
        userUsage = null
      }
    })
  }

  fetchFirebase = async () => {
    this.fetchAllUserInformation()
    await this.fetchUserComment()
    await this.fetchAllUserUsage()
  }

  componentDidMount() {
    this.fetchFirebase()
  }
  
  componentWillUnmount() {
    firebase.database().ref('user-complete').off()
    firebase.database().ref('exercise-rating').off()
  }

  renderList = (item, exerciseData) =>{
    let newData = []
    let newItem = null
    // console.log(exerciseData)
    for(let i in exerciseData){
      newData.push([i,exerciseData[i]])
    }
    for(let i in newData){
      if(newData[i][1].url == item.URL){
        newItem = {
          title:"Star: " + newData[i][1].starCount + "\n" + "Comment: " + newData[i][1].feedbackText,
          image: item.image,
          url: item.URL
        }
      }
    }
    return (
      <Card item = { newItem == null ? item : newItem } style={{ marginRight: theme.SIZES.BASE, width: 200 }}></Card>
    );
  }

  renderUserUsage = (item, index) => {
    let userId = item[0]
    let userdata = []
    let exerciseData = null
    let data = null
    if(this.state.userUsageWithFullData != null){
      userdata = this.state.userUsageWithFullData.filter(item =>{
        if(item[0] == userId){
          data = item[1]
          if(item.length == 3){
            exerciseData = item[2]
          }else{
            exerciseData = null
          }
          return true
        }
        return false
      })
    }
    return (
          <Block flex>
            <Text center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.title}
            > ID: {item[2]} {"\n"} Name: {item[1]}
            </Text>
            <Block flex row>
              <FlatList 
                horizontal = { true }
                data= {data}
                renderItem={({ item }) => this.renderList(item, exerciseData) }
                keyExtractor={(item, index) => index.toString()}
              >
              </FlatList>
              </Block>
          </Block>
    )
  }



  renderfd = (item, index) => {
    return (
        <Block>
          <Block row space="between">
            <Text center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.title}
            > {item[3]} </Text>
          </Block>

        </Block>
    )
  }

  renderCards = () => {
    return (
      <View style={styles.articles}>
        <Block flex>
          <Text bold size={28} color="#32325D">
            {'\nAdmin Dashboard:'}
          </Text>
          <Block>
            <Text bold size={22} color="#32325D">
              {'\n Usage data:'}
            </Text>
          </Block>
          <Block flex row>
            <FlatList data={this.state.userList}
              renderItem={({ item }) => this.renderUserUsage(item)}
              keyExtractor={(item, index) => index.toString()}>
            </FlatList>
          </Block>
        </Block>
      </View>
    );
  };

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
  title: {
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
  subtext: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: argonTheme.COLORS.HEADER,
    textAlign: "justify",
    justifyContent: "flex-start",
    alignItems: "flex-start"
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
    width: 0,
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
    width: 0,
    height: 0,
    borderRadius: 0
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: 0, //draft
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Articles;
