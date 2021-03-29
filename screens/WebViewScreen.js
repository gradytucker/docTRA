import React from 'react';
import { StyleSheet, View, Text,Dimensions,ActivityIndicator,SafeAreaView,StatusBar,Linking} from 'react-native'
import {WebView} from 'react-native-webview';
import { argonTheme } from '../constants';
import { withNavigation } from '@react-navigation/compat';


const { width } = Dimensions.get('screen');

/*
the purpose of this js file is open a web page in app when user click article card
and get the web url send by card component.
*/
class WebViewScreen extends React.Component {
  // loading state when open the web page
  render
  LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color='#0a1142'
        size='large'
        style={{
        flex: 1,
        justifyContent: 'center'
        }}
      />
    )
  }
  // web render funcion
  render() {
    const {navigation, route} = this.props;
    //const {websiteURL} = navigation.state.params
    console.log(route)
    return (
      // link to the web page
      <WebView
        source={{ uri: route.params.websiteURL}}
        javaScriptEnabled={true}
        renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
        ref={(ref) => { this.webview = ref;}}
      />
    )
  }
} 
  
export default WebViewScreen