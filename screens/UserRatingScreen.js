import React from "react";
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
import Home from "../screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Button } from "../components";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const createOneButtonAlert = () =>
  Alert.alert(
    "Response submitted",
    "Thankyou for giving feedback",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

class GeneralStarExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }


  render() {
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Text bold size={28} color="#32325D">
            {"\nRate DocTRA\n"}
          </Text>
          <Block center style={styles.productItem}>
            <Block>
              <Text center
                size={20}
                color={theme.COLORS.MUTED}
                style={styles.aboutTitle}> {"\nEnjoy using docTRA?\n Give the app a rating!"}</Text>
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
              style={styles.aboutTitle}> {"\nHave any suggestions to make the app better? Tell us below!"}</Text>
            <TextInput style={styles.input}
              ref={input => { this.textInput = input }}
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
                createOneButtonAlert();
                this.setState({
                  starCount: 0
                });
              }
              }>submit all</Button>
          </Block>
        </ScrollView>
      </Block >

    );
  }
}

export default GeneralStarExample


const styles = StyleSheet.create({
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
    width: width / 1.3,
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
