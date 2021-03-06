import React from "react";
import { withNavigation } from '@react-navigation/compat';
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants";
import { Card } from "../components";
import { BorderlessButton } from "react-native-gesture-handler";
import Home from "./Home";
import { NavigationContainer } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Button } from "../components";
import firebaseSetUp from "../firebase";
import firebase from "firebase"
import { NavigationEvents } from "@react-navigation/compat";

const { width } = Dimensions.get("window");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
var index = 0;

/*unused function */
const createOneButtonAlert = () =>
  Alert.alert(
    "Response submitted",
    "Thankyou for giving feedback",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

/*unused function */
const feedbackExistAlert = () => {
  Alert.alert(
    "you have already submitted",
    "Thankyou for giving feedback",
    [
      { text: "ok", onPress: () => console.log("exist") }
    ]
  );
}
class GeneralStarExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      feedbackText: ""
    };
  }

  //get index for the specify article url on the main article list
  compareWithArticalURL = async (url) => {
    let dataList = []
    firebase.database().ref('ArticleURL').once('value').then((snapshot) => {
      dataList = snapshot.val()
      for (let i = 1; i < dataList.length; i++) {
        if (url == dataList[i].URL) {
          index = i
          return
        }
      }
    })
  }

  //save the user feedback into firebase
  //data structure: "json object:{userId: Array[json object{ article feedback }] }"
  storeUserFeedback = async (userId, textInput, starCount) => {
    const url = this.props.route.params.websiteURL
    let updates = {}
    let data = null
    //get the specify article index on main data list 
    await this.compareWithArticalURL(url)
    firebase.database().ref('exercise-rating/' + userId).get().then(function (snapshot) {
      // if already create the relevant path on fireabse
      // updata the list
      if (snapshot.exists()) {
        data = {
          Articles_id: index,
          url: url,
          starCount: starCount,
          feedbackText: textInput
        }
        updates['/exercise-rating/' + userId + "/" + index] = data
        firebase.database().ref().update(updates);
      } else {
        // create the relevant path to firebase and set the first data to it.
        data = null
        data = {
          Articles_id: index,
          url: url,
          starCount: starCount,
          feedbackText: textInput
        }
        firebase.database().ref('/exercise-rating/' + userId + "/" + index).set(data);
      }
    }).catch(function (error) {
      console.error(error);
    });

  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }


  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Text bold size={28} color="#32325D">
            {"\nRate That Exercise\n"}
          </Text>
          <Block center style={styles.productItem}>
            <Block>
              <Text center
                size={20}
                color={theme.COLORS.MUTED}
                style={styles.aboutTitle}> {"\nHow would you rate the exercise you just completed?"}</Text>
            </Block>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Text center
              size={20}
              color={theme.COLORS.MUTED}
              style={styles.aboutTitle}> {"\n\nDo you have any comments about that exercise?"}</Text>
            <TextInput style={styles.input}
              ref={input => { this.textInput = input }}
              onChangeText={text => { this.setState({ feedbackText: text }); }}
              underlineColorAndroid="transparent"
              placeholder="Suggestions..."
              multiline={true}
              textAlignVertical={"top"}
              textBreakStrategy={"highQuality"}
              placeholderTextColor="#9a73ef"
              autoCapitalize="none" />
            <Button
              onPress={() => {
                this.textInput.clear();
                this.setState({
                  starCount: 0
                });
                this.storeUserFeedback(firebase.auth().currentUser.uid, this.state.feedbackText, this.state.starCount)
                navigation.navigate("tabStack");
              }
              }>submit and finish</Button>
          </Block>
        </ScrollView>
      </Block >

    );
  }
}

export default GeneralStarExample


const styles = StyleSheet.create({
  screen: {
    maxWidth: 800
  },
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: 0, //draft
  },
  input: {
    marginTop: -20,
    marginBottom: 50,
    height: 100,
    maxWidth: 500,
    width: width / 1.7,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 0,
    marginBottom: 0,
    fontWeight: "bold",
    color: argonTheme.COLORS.HEADER,
    textAlign: "justify",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  aboutTitle: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingTop: -40,
    paddingBottom: 60,
    fontWeight: "800",
    color: argonTheme.COLORS.HEADER,
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
    width: cardWidth - theme.SIZES.BASE - 100,
    height: cardWidth - theme.SIZES.BASE - 100,
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
