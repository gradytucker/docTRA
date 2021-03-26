import React from 'react';
import { StyleSheet, View, Text,Dimensions,ActivityIndicator,SafeAreaView,StatusBar} from 'react-native'
import {WebView} from 'react-native-webview';
import { argonTheme } from '../constants';
import { withNavigation } from '@react-navigation/compat';


const { width } = Dimensions.get('screen');

class WebViewScreen extends React.Component {
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
    
  render() {
    const {navigation, route} = this.props;
    //const {websiteURL} = navigation.state.params
    console.log(route)
    return (
      <WebView
        source={{ uri: route.params.websiteURL}}
        renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
      />
    )
  }
} 
  
export default WebViewScreen