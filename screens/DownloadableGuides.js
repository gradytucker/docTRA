import React from "react";
import {
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

const { width } = Dimensions.get("window");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class Articles extends React.Component {
  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
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
    );
  };

  renderCards = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>

        <Block flex>
          <Text bold size={28} color="#32325D">
            {'\nGuides Available for Downloading:'}
          </Text>
          <Block>
            <Text bold size={15} color="#666666">
              {'\n Downloadable Guides for training reinforcement and assessment will appear here as they are provided!'}
            </Text>

          </Block>
        </Block>
      </ScrollView>
    );
  };



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
  screen: {
    maxWidth: 800
  },
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
