import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Linking, webView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { WebView } from 'react-native-webview';
import { argonTheme } from '../constants';


class Card extends React.Component {

  render() {
    const { navigation, item, horizontal, full, none, style, ctaColor, imageStyle, nonExercise } = this.props;
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      none ? styles.noImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles
    ];


    return (
      <Block row={horizontal} card flex style={cardContainer}>
        {/*navigate to the webViewScreen when you click the element */}
        <TouchableWithoutFeedback onPress={() => nonExercise == true ? navigation.navigate('NonExerciseWebViewScreen', { screen: "NonExerciseWebViewScreen", params: { websiteURL: item.URL } }) : navigation.navigate('WebViewScreen', { screen: "WebViewScreen", params: { websiteURL: item.URL } })}>
          <Block flex style={imgContainer}>
            <Image source={{ uri: item.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        {/*navigate to the webViewScreen when you click the element */}
        <TouchableWithoutFeedback onPress={() => nonExercise == true ? navigation.navigate('NonExerciseWebViewScreen', { screen: "NonExerciseWebViewScreen", params: { websiteURL: item.URL } }) : navigation.navigate('WebViewScreen', { screen: "WebViewScreen", params: { websiteURL: item.URL } })}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={item.cardStyles == none ? 14 : 25} style={item.cardStyles == none ? styles.cardTitle : styles.noImageTitle}>{item.title}</Text>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.cta}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  none: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  nonExercise: PropTypes.bool
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  noImageTitle: {
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingBottom: 6,
    fontWeight: "normal",
    fontStyle: "italic"
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  noImage: {
    height: 50,
    width: 50,
    marginTop: 15,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",

  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);