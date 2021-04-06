import React from 'react';
import { StyleSheet, View, Text,Dimensions,ActivityIndicator,SafeAreaView,StatusBar,Linking} from 'react-native'
import {WebView} from 'react-native-webview';
import { argonTheme } from '../constants';
import { withNavigation } from '@react-navigation/compat';
import firebase from 'firebase'

const { width } = Dimensions.get('screen');

/*
the purpose of this js file is open a web page in app when user click article card
and get the web url send by card component.
*/
class WebViewScreen extends React.Component {
  storeUserHistory = (userId, url) => {
    var dataList = []
    var updates = {}
    firebase.database().ref('user-history/' + userId).get().then(function(snapshot){
      if (snapshot.exists()) {
        dataList = snapshot.val()
        console.log(dataList)
        dataList.push({url:url})
        updates['/user-history/' + userId] = dataList;
        firebase.database().ref().update(updates);
      }
      else {
        dataList.push({url: url})
        firebase
        .database()
        .ref('user-history/' + userId)
        .set({
          urlList: dataList
        });
      }
    }).catch(function(error) {
      console.error(error);
    });
  }
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
    this.storeUserHistory(firebase.auth().currentUser.uid,route.params.websiteURL);
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