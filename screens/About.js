import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants";
import { Card } from "../components";
import { BorderlessButton } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class Articles extends React.Component {
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

      <Block>
        <Block center style={styles.productImage}>
          <Image
            style={styles.productImage}
            source={require('../assets/imgs/doctraLogo.png')}
          />
        </Block>
        <Block>
          <Text center
            size={20}
            color={theme.COLORS.MUTED}
            style={styles.aboutTitle}> The Doctor Training and Rehabilitation Application.</Text>
        </Block>
        <Block flex={false} row center space="between" styles={styles}>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block>
            <Block row space="between">
              <Text center
                size={16}
                color={theme.COLORS.MUTED}
                style={styles.title}> Research Articles</Text>
            </Block>
          </Block>
          <Block>
            <Block row space="between">
              <Text center
                size={16}
                color={theme.COLORS.MUTED}
                style={styles.title}> FAQs</Text>
            </Block>
          </Block>
          <Block>
            <Block row space="between">
              <Text center
                size={16}
                color={theme.COLORS.MUTED}
                style={styles.title}> Downloadable Guides</Text>
            </Block>
          </Block>
          <Block>
            <Block row space="none">
              <Text center
                size={16}
                color={theme.COLORS.MUTED}
                style={styles.title}> Give Feedback</Text>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  };


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
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
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

export default Articles;
