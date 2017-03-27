### Overview

This React Native app accesses the FitBit Oauth2 API using the 'Implicit Grant' auth flow.

For this auth flow, we only need our FitBit 'client ID' (not the 'client secret', which should not be embedded in a mobile app).

### Getting Started

You first need to create a FitBit application to obtain a 'client ID' and client secret...

* https://dev.fitbit.com/

Update the 'config.js' file at the top directory with your FitBit 'client ID' (secret not needed for 'Implicit Grant' auth flow)...

```javascript
export default {
  client_id: 'YOUR-FITBIT-CLIENT-ID',
}
```

### Run the App

Either...

1. Launch from Xcode
   * CMD-R
1. Launch from React-Native cli
   * $ react-native run-ios

### Custom iOS URL Type

The app uses a custom URL type as the Oauth2 redirect URL (returned by FitBit and handled by our app).

* Custom URL Type = 'fithub://'
* FitBit Oauth2 Callback URL = 'fithub://oauth2/callback/fitbit'

### React Native Version

This app intentionly uses React Native 0.39.0 due to instabilities with 0.4x.x.

```bash
$ react-native init MyFitBitApp --version 0.39.0
```
