import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("window");
const onboardingBGdocTRA = require("../assets/splash.png");
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor="#ff4081"
          //Background color of statusBar
          translucent={false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <Block flex center>
          <ImageBackground
            source={onboardingBGdocTRA}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>

        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.title}>
              <Block>
                <Text color="white" size={60}>

                </Text>
              </Block>
              <Block>
                <Text color="white" size={60}>

                </Text>
              </Block>
              <Block style={styles.subTitle}>
                <Text color="white" size={16}>

                </Text>
              </Block>
            </Block>
            <Block center>
              <Button
                style={styles.button}
                color={"#ED5653"}
                onPress={() => navigation.navigate("Account")}
                textStyle={{ color: "#FFFFFF" }}
              >
                Get Started
                </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 200,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop: '-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
