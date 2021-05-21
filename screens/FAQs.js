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
            {'\nFrequently Asked Questions:'}
          </Text>
          <Block>
            <Text bold size={22} color="#32325D">
              {'\n\n • What is DocTRA?'}
            </Text>
            <Text bold size={15} color="#666666">
              {'\n DocTRA is an application platform that enables targeted information to be delivered to doctors following face to face exercises. The aim is to assist Doctors with time management and aid in dealing with emotional stress.'}
            </Text>
          </Block>
          <Block>
            <Text bold size={22} color="#32325D">
              {'\n\n • What does DocTRA stand for?'}
            </Text>
            <Text bold size={15} color="#666666">
              {'\n DocTRA stands for "Doctor Training Reinforcement and Assessment".'}
            </Text>
          </Block>
          <Block>
            <Text bold size={22} color="#32325D">
              {'\n\n • What is the motive behind DocTRA?'}
            </Text>
            <Text bold size={15} color="#666666">
              {'\n Doctors are extremely time poor and are dealing with emotional stress in their day to day activities. Training is available that will assist doctors in managing this stress however reinforcement and assessment of this training is both problematic and critical to its success. Firstly, reinforcement of training needs to be targeted in such a way that it is not perceived as an added burden. Secondly, regardless of how effective the targeting is, evidence is needed to justify the time taken through assessment of the training effectiveness.'}
            </Text>
          </Block>
          <Block>
            <Text bold size={22} color="#32325D">
              {'\n\n • How will DocTRA be run at Epworth?'}
            </Text>
            <Text bold size={15} color="#666666">
              {'\n An Epworth Hospital grant proposal has been submitted for a randomised control trial for assessing the impact of common humanity training on doctor wellbeing, sense of connection and compassion. This study investigates whether common humanity training, delivered via face-to-face training combined with a 6-week app post training improves doctors’ wellbeing, sense of connection to others and compassion. \n\nThe project hypothesis is that common humanity training, reinforced by an app, will lead to an increase in doctors’ wellbeing, sense of connection to others and compassion. This study aims to research strategies that are effective in supporting doctors to have improved wellbeing and resilience, avoid burnout and cultivate and sustain a sense of connection to others and compassion. Face-to-face training, combined with an app, may be an efficient delivery mechanism as an app offers flexibility, reinforcement of the training and decreased time commitment. \n\nThe running of the common humanity training will take place in July 2021. Doctors who work at Epworth HealthCare will be invited to participate in the study. Participation will be anonymous and involve attendance at a two hour face-to-face common humanity training session combined with using a common humanity app for 6 weeks after the training. Doctors will be required to fill out pre- and post-test surveys prior and immediately after the face-to-face training, as well as at 6 weeks and 12 weeks post training to determine their scores on wellbeing, sense of connection and compassion\n\n\n\n\n'}
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
