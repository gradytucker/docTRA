import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

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
          <Card item={articles[0]} full />
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
});

export default Home;
