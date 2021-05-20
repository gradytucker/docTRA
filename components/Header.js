import React from 'react';
import { withNavigation, StackActions, NavigationActions } from '@react-navigation/compat';
import { TouchableOpacity, Alert, View, TextInput, StyleSheet, Platform, Dimensions, } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//test

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';
import firebase from "firebase"
const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

function compareWithArticalUR(userId, url) {
  let dataList = []
  firebase.database().ref('user-modules/' + userId).get().then((snapshot) => {
    dataList = snapshot.val()
    for (let index = 1; index < dataList.length; index++) {
      if (url == dataList[index].URL) {
        firebase.database().ref('user-modules/' + userId + "/" + index).remove().then(function () {
          console.log(index)
          console.log("removed!")
        })
        return
      }
    }
  })
}

function recordUserCompleteExercise(userId, url) {
  var dataList = []
  var updates = {}
  firebase.database().ref('user-complete/' + userId).get().then(function (snapshot) {
    if (snapshot.exists()) {
      dataList = snapshot.val()
      if (dataList.length <= 100) {
        dataList = dataList.filter(item => item.url !== url)
        dataList.push({ url: url })
        updates['/user-complete/' + userId] = dataList;
        firebase.database().ref().update(updates);
      } else {
        dataList.pop()
        dataList = dataList.filter(item => item.url !== url)
        dataList.push({ url: url })
        updates['/user-complete/' + userId] = dataList;
        firebase.database().ref().update(updates);
      }
    } else {
      dataList.push({ url: url })
      updates['/user-complete/' + userId] = dataList
      firebase
        .database()
        .ref()
        .update(updates)
    }
  }).catch(function (error) {
    console.error(error);
  });
}
class Header extends React.Component {
  handleLeftPress = () => {
    const { back, title, navigation } = this.props;

    const resetNonExercise = () => {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'NonExerciseWebviewScreen' }],
      });
    }


    const BackAlert = () =>
      confirmAlert({
        message: "If you have not finished the exercise, it will not be marked as complete.",
        buttons:
          [
            {
              label: "Leave", onClick: () => (navigation.goBack(),
                this.props.navigation.reset({ index: 0, routes: [{ name: 'WebViewScreen' }], }))
            },
            { label: "Okay", onClick: () => (console.log("OK Pressed")) }
          ]
      });
    return (title == "Web" ? BackAlert() :
      title == "Article PDF" ? (navigation.goBack(), resetNonExercise()) :
        navigation.goBack());
  }

  handleFinishPress = () => {
    const { back, title, navigation } = this.props;
    const url = this.props.scene.__memo[0].params.websiteURL
    const FinishAlert = () =>
      confirmAlert({
        message: "Finished the Exercise?",
        buttons:
          [
            { label: "No", onClick: () => console.log("OK Pressed") },
            {
              label: "Yes", onClick: () => (recordUserCompleteExercise(firebase.auth().currentUser.uid, url),
                navigation.navigate("ExerciseRating", { screen: "Exercise Rating", params: { websiteURL: url } }),
                this.props.navigation.reset({ index: 0, routes: [{ name: 'WebViewScreen' }], }))
            }

          ]
      });
    return (FinishAlert());
  }

  renderRight = () => {
    const { white, title, navigation } = this.props;
  }



  renderHeader = () => {
    const { options, tabs } = this.props;
    if (tabs || options) {
      return (
        <Block center>

          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const { route, back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const noShadow = ['Categories', 'Deals', 'Pro'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.header,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}

          style={navbarStyles}
          transparent={transparent}
          right={
            title == 'Web' ?
              <Text bold size={16} colour="#32325D" onPress={this.handleFinishPress}> {'Finish'} </Text>
              : <Text bold size={22} color="#32325D">
                {'docTRA'}
              </Text>}
          rightStyle={{ paddingTop: iPhoneX ? 25 : 0, flex: 0.8 }}
          left={title != 'Home' &&
            title != 'About' &&
            title != 'Training' &&
            title != 'Exercise Rating' &&
            title != 'Profile' ?
            <Icon
              name={'chevron-left'} family="entypo"
              size={28} onPress={this.handleLeftPress}
              color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
              style={{ marginTop: 2 }}
            />
            : <Text></Text>
          }

          leftStyle={{ paddingTop: iPhoneX ? 25 : 0, flex: 0.4 }}
          titleStyle={[
            title != 'Home' && title != 'Exercise Rating' && title != 'About' && title != 'Training' && title != 'Profile' ? styles.title : styles.titleNav,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}

          {...props}
        />

        {this.renderHeader()}
      </Block>

    );
  }
}




const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: iPhoneX ? 25 : 0,
  },

  titleNav: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: iPhoneX ? 25 : 0,
    marginLeft: -60,
  },

  navbar: {
    paddingVertical: 20,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    height: iPhoneX ? 100 : 70,
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});

export default withNavigation(Header);

