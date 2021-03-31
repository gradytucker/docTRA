import React from 'react';
import { StyleSheet, Dimensions, ScrollView, StatusBar, Image } from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Card } from '../components';
import articles from '../constants/articles';
import { Images } from '../constants';
const { height, width } = Dimensions.get('screen');

var quotes = ["Just like me, this person wishes to be happy and not to suffer ~ Jinpa 2016",
  "This person is someone's mother, father, son, daughter",
  "Anyone can get sick at any time, this person could be me or someone I care about",
  "You today. Me tomorrow",
  "All unskilful behaviour is the tragic expression of an unmet need ~ Marshall Rosenberg",
   "If you want others to be happy, practice compassion. If you want to be happy, practice compassion ~ Dalai Lama",
   "Compassion is the basis of all morality ~ Arthur Schopenhauer",
   "Simplicity, patience, compassion. These three are your greatest treasures ~ Lao Tzu",
   "The purpose of human life is to serve, and to show compassion and the will to help others ~ Albert Schweitzer"];
var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Text bold size={28} color="#32325D">
          {'\nRemember:'}
        </Text>
        <Text size={20} color="#3483eb">
          {"\"" + randomQuote + "\""}
        </Text>
        <Block flex>
          <StatusBar
            barStyle="dark-content"     // dark-content, light-content and default
            hidden={false}  //To hide statusBar
            backgroundColor="#ff4081"   //Background color of statusBar
            translucent={false}     //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
          <Card item={articles[0]} full />
          <Text bold size={28} color="#32325D"> {'\nCompassion Cartoon'}
          </Text>
          <Block>
            <Image
                source={Images.compassionCartoon}
                style={styles.cartoon}
            />
          </Block>
          <Text bold size={28} color="#32325D">
            {'\nExercises for you'}
          </Text>
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Block flex row>
            <Card item={articles[3]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[4]} />
          </Block>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: 0, //draft
  },
  cartoon: {
    flex: 1,
    width: width * 0.9,
    height: width,
    resizeMode: "contain"
  },
});

export default Home;
