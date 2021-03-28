import React from 'react';
import { StyleSheet, Dimensions, ScrollView, StatusBar, Image } from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Card } from '../components';
import articles from '../constants/articles';
import { Images } from '../constants';
const { height, width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Text bold size={28} color="#32325D">
          {'\nDaily Quote'}
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
