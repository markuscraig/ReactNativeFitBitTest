/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Linking,
  StyleSheet,
  Text,
  View
} from 'react-native';
import config from './config.js';
import qs from 'qs';

export default class ReactNativeFitBitTest extends Component {

  constructor(props) {
    super(props);

    this._handleOpenURL = this._handleOpenURL.bind(this);
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);

    // Call OAuth
    var client_id = config.client_id;
    const oauthurl = 'https://www.fitbit.com/oauth2/authorize?'+
              qs.stringify({
                client_id,
                response_type: 'token',
                scope: 'heartrate activity activity profile sleep',
                redirect_uri: 'fithub://oauth2/callback/fitbit',
                expires_in: '31536000',
                //state,
              });
    console.log(oauthurl);

    // check can open the url
    Linking.canOpenURL(oauthurl).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + oauthurl);
      } else {
        Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
      }
    }).catch(err => console.error('An error occurred', err));

    // open the url
    //Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
  }

  /*
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }
  */

  _handleOpenURL(event) {
    console.log("HANDLE URL: event.url = " + event.url);
    Linking.removeEventListener('url', this._handleOpenURL);
    const [, query_string] = event.url.match(/\#(.*)/);
    console.log(query_string);

    const query = qs.parse(query_string);
    console.log(`query: ${JSON.stringify(query)}`);

    this._getData(query.access_token);
  }

  _getData(access_token) {
    fetch(
       'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        //body: `root=auto&path=${Math.random()}`

      }
    ).then((res) => {
      return res.json()
    }).then((res) => {
      console.log(`res: ${JSON.stringify(res)}`);
    }).catch((err) => {
      console.error('Error: ', err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeFitBitTest', () => ReactNativeFitBitTest);
