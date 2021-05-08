import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { Images, argonTheme } from "../constants";
import FAQresponses from '../constants/FAQresponses';
import { Card } from "../components";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
var userList = []
class Articles extends React.Component {

  state = {
    userList : null
  }
  fetchAllUserInformation = () =>{
    firebase.database().ref('user-information').on('value', async snapshot =>{
      let dataList = snapshot.val()
      for(let i in dataList){
        userList.push([i,dataList[i].name])
      }
      this.setState({userList:userList})
    })
  }

  componentDidMount(){
    this.fetchAllUserInformation()
  }

  componentWillUnmount(){
    firebase.database().ref('user-information').off()
  }

  renderUserUsage = (item) =>{
    return(
      <View style = {styles.articles}>
        <Block flex>
        <Text bold size={20} color="#32325D">
            {'\nUser_ID:'}
          </Text>
          <Block flex>
            <Text bold size={16} color="#32325D"> 
              {item[1]} 
            </Text>
          </Block>
      </Block>
    </View>
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
              {'\n User data goes here:'}
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
        <FlatList  ListHeaderComponent={this.renderCards()}>
        </FlatList>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
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
