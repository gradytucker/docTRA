import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, Alert, View, TextInput, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);



class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    const BackAlert = () =>
      Alert.alert(
        "If you have not finished the exercise, it will not be marked as complete.",
        "",
        [
          { text: "Okay", onPress: () => (console.log("OK Pressed")) },
          { text: "Leave", onPress: () => (console.log("OK Pressed"), navigation.goBack()) }
        ]
      );
    return (BackAlert());
  }

  handleFinishPress = () => {
    const { back, navigation } = this.props;
    const FinishAlert = () =>
      Alert.alert(
        "Finished the Exercise?",
        "",
        [
          { text: "Yes", onPress: () => (console.log("OK Pressed"), navigation.goBack()) },
          { text: "No", onPress: () => console.log("OK Pressed") }
        ]
      );
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
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;

    const noShadow = ['Categories', 'Deals', 'Pro', 'Profile'].includes(title);
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
            title != 'Home' && title != 'About' && title != 'Training' && title != 'Profile' ? styles.title : styles.titleNav,
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

