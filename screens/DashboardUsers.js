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

const { width } = Dimensions.get("window");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
var userList = []


class Articles extends React.Component {

  state = {
    userList: null,

  }

  //fetch the user information from firebase
  fetchAllUserInformation = async () => {
    await firebase.database().ref('user-information').once("value").then(snapshot => {
      let dataList = snapshot.val()
      for (let i in dataList) {
        //data format: Array[firebase uid, user name, user_id]
        userList.push([i, dataList[i].name, dataList[i].USER_ID])
      }
    })
    // save the data to state object.
    this.setState({ userList: userList })
  }

  /*FIREBASE FETCH FUNCTION*/
  fetchFirebase = async () => {
    this.fetchAllUserInformation()
  }

  /*MOUNT*/
  componentDidMount() {
    this.fetchFirebase()
  }

  /*UNMOUNT*/
  componentWillUnmount() { }

  renderUserUsage = (item, index) => {
    return (
      <TouchableWithoutFeedback>
        <Block>
          <Block row space="between">
            <Text center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.title}
            > ID: {item[2]} {"\n"} Name: {item[1]}</Text>
          </Block>

        </Block>
      </TouchableWithoutFeedback>

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
              {'\n All users:\n'}
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
        <ScrollView style={styles.screen}
          showsVerticalScrollIndicator={false}
        >
          <FlatList ListHeaderComponent={this.renderCards()}>
          </FlatList>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: argonTheme.COLORS.HEADER,
    textAlign: "justify",
    justifyContent: "flex-start",
    alignItems: "flex-start"
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
    maxWidth: 800,
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: 0, //draft
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Articles;
