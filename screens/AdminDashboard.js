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
class Articles extends React.Component {

  // render user information(user Id and user name)
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



  renderfd = (item, index) => {
    return (
      <TouchableWithoutFeedback>
        <Block>
          <Block row space="between">
            <Text center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.title}
            > {item[3]} </Text>
          </Block>

        </Block>
      </TouchableWithoutFeedback>

    )
  }

  //render the three admin's options
  renderCards = () => {
    const { navigation } = this.props;
    return (
      <View style={styles.articles}>
        <Block flex>
          <Text bold size={28} color="#32325D">
            {'\nAdmin Dashboard:\n'}
          </Text>
          <Block>

          </Block>
          <Block flex row>
            <Text center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.title}
              onPress={() => navigation.navigate("DashboardUsers")}
            > see all users </Text>
          </Block>
          <Block flex row>
            <Text center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.title}
              onPress={() => navigation.navigate("DashboardExercises")}
            > see exercise ratings </Text>
          </Block>
          <Block flex row>
            <Text center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.title}
              onPress={() => navigation.navigate("DashboardAppFeedback")}
            > see anonymous app feedback </Text>
          </Block>
        </Block>
      </View>
    );
  };


  //main render function
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
