import React from 'react';
import { StyleSheet, Dimensions, ScrollView, StatusBar, Image } from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Card } from '../components';
import articles from '../constants/articles';
import { Images } from '../constants';
const { height, width } = Dimensions.get('screen');
import firebase from 'firebase'
import Articles from './Training';

const now = new Date().getHours();
var message = "hello";
var key_count = 0;
if (now < 12) {
  message = '\nGood Morning!\nHere are some activities:';
} else if (now >= 12 && now <= 17) {
  message = '\nGood Afternoon!\nHere are some activities:';
} else if (now >= 17 && now <= 24) {
  message = '\nGood Evening!\nHere are some activities:';
}


var newArticleList = null
var randomList = getRandomIndex([1,2,3,4,5])

function getRandomIndex(array){
    var i = array.length,
    j = 0,
    temp;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
    return array;
}

async function fetchArticalList(){ 
  await firebase.database().ref('ArticleURL').get().then(function(snapshot){
      newArticleList = snapshot.val()
      console.log(newArticleList)
    })
}

class Home extends React.Component {

  state = {
    user: false,
    articles: articles,
    exercisesToDo1: [articles[1], articles[2]],
    exercisesToDo2: [articles[3], articles[4]],
    reflectiveExercises: [articles[1], articles[2]]
  }
  
  firebaseFetch = firebase.auth().onAuthStateChanged(async user => {
    if (user != null) {
      await fetchArticalList()
      console.log(newArticleList)
      console.log(randomList)
      this.setState({articles: newArticleList})
      this.setState({exercisesToDo1: [newArticleList[1], newArticleList[2]]})
      this.setState({exercisesToDo2: [newArticleList[3], newArticleList[4]]})
      this.setState({reflectiveExercises: [newArticleList[1], newArticleList[2]]})
    }
  })

  componentDidMount() {
    this.firebaseFetch()
  }

  componentWillUnmount(){}

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Text bold size={28} color="#32325D">
          {message}
        </Text>

        <Block flex>
          <StatusBar
            barStyle="dark-content"     // dark-content, light-content and default
            hidden={false}  //To hide statusBar
            backgroundColor="#ff4081"   //Background color of statusBar
            translucent={false}     //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
          <Text bold size={20} color="#32325D">
            {'\n\nDaily quote'}
          </Text>
          <Card item={articles[0]} none keyExtractor={(item, index) => index.toString()}/>
          <Text bold size={20} color="#32325D"> {'\nCompassion Cartoon'}
          </Text>
          <Block>
            <Image
              source={Images.compassionCartoon}
              style={styles.cartoon}
            />
          </Block>
          <Text bold size={20} color="#32325D">
            {'\nExercises for you'}
          </Text>
          <Block flex row>
            {this.state.exercisesToDo1.map((w) => {
              return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
            })}
          </Block>
          <Block flex row>
            {this.state.exercisesToDo2.map((w) => {
              return <Card item={w} key={++key_count} style={{ marginRight: theme.SIZES.BASE, width: 200 }} />
            })}
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
