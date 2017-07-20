/**
 * Created by user on 18.07.17.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';

// import Login from '../pages/Login';

import { color } from '../constants/color';

import RouterComponent from '../route/RouterComponent';

const uiTheme = {
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primaryLight,
  },
});

export default class Root extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            animated
            hidden
          />
          <RouterComponent />
        </View>
      </ThemeProvider>
    );
  }
}
