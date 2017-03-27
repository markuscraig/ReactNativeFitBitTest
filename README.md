### React Native

This app intentionly uses React Native 0.39.0 due to instabilities with 0.4x.x.

```bash
$ react-native init MyFitBitApp --version 0.39.0
```

### Getting Started

You first need to create a FitBit application to obtain a client ID and client secret...

* https://dev.fitbit.com/

Update the 'config.js' file at the top directory with your FitBit client ID and secret...

```javascript
export default {
  client_id: 'YOUR-FITBIT-CLIENT-ID',
  client_secret: 'YOUR-FITBIT-CLIENT-SECRET'
}
```

### Run the App

Either...

1. Launch from Xcode
   * CMD-R
1. Launch from React-Native cli
   * $ react-native run-ios
