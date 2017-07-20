/**
 * Created by user on 18.07.17.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import NavigationDrawer from '../components/NavigationDrawer';
import Login from '../pages/Login';
import JobsList from '../pages/JobsList';
import JobDetail from '../pages/JobDetail';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
});

class RouterComponent extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene
            key="root"
            hideNavBar
            hideTabBar
            component={NavigationDrawer}
            open={false}
          >
            <Scene key="main" hideNavBar hideTabBar >
              <Scene key="Login" component={Login} />
              <Scene key="JobsList" component={JobsList} />
              <Scene key="JobDetail" component={JobDetail} />
            </Scene>
          </Scene>
        </Router>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.reducerAuth.username,
  };
}

export default connect(mapStateToProps)(RouterComponent);
