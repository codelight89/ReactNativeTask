/**
 * Created by user on 17.07.17.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';

import * as actionsRoute from '../redux/actions/actionsRoute';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Toolbar } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

import * as actionsLogin from '../redux/actions/actionsLogin';
import { color } from '../constants/color';
import Spinner from '../components/Spinner';

const { width, height } = Dimensions.get('window');

const buttonHeight = 45;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: color.white,
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 10,
    padding: 5,
    borderRadius: 2,
    backgroundColor: color.grayLight,
  },
  iconContainer: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: color.white,
  },
  txtphoneContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  btnContainer: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 45,
    color: color.white,
  },
  btnLoginContainer: {
    width: width - 40,
    height: buttonHeight,
    backgroundColor: color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: color.white,
  },
  shadow: {
    elevation: 5,
    shadowColor: color.black,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 1,
    },
  },
  toolbarContainer: {
    backgroundColor: color.primary,
  },

  scrollContainer: {
    paddingHorizontal: 20,
  },

  mediumBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  smallDarkGray: {
    fontSize: 14,
    color: color.grayDark,
    paddingVertical: 5,
  },

  infoContainer: {
    paddingVertical: 16,
  },

  regularText: {
    paddingVertical: 5,
  },

  contentContainer: {
    paddingVertical: 25,
  },

  authResultText: {
    fontSize: 18,
    color: color.white,
  },
  spinnerView: {
    height: buttonHeight,
    width: buttonHeight,
  },
});

const { State: TextInputState } = TextInput;

class JobDetail extends React.Component {
  static propTypes = {
    login: React.PropTypes.func,
    authResult: React.PropTypes.string,
    authRequestInProgress: React.PropTypes.bool,
    data: React.PropTypes.object,
  };

  static defaultProps = {
    login: () => {},
    authResult: '',
    authRequestInProgress: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: 'jkdjdk',
      password: 'ddddd',
    };
  }

  onPressMenu = () => {
    Actions.refresh({ key: 'root', open: value => !value });
  };

  onLogin = () => {
    console.warn('onLogin');
    const { login } = this.props;
    const { username, password } = this.state;
    login({ username, password });
  };

  onLeftElementPress = () => {
    actionsRoute.pop();
  }

  dismissKeyboard = () => {
    TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
  }

  render() {
    const { data } = this.props;

    console.warn('job detail data', data);

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={this.onLeftElementPress}
          centerElement={data.role}
          style={{
            container: styles.toolbarContainer,
          }}
        />

        <ScrollView style={styles.scrollContainer}>

          <View style={styles.contentContainer}>

            <Text style={styles.mediumBold}>{`$${data.rate}, ${data.rateType}`}</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.smallDarkGray}>{`${data.city}, ${data.updated}`}</Text>
              <Text style={styles.smallDarkGray}>{`Experience: ${data.experience}`}</Text>
              <Text style={styles.smallDarkGray}>{`Job term: ${data.jobTerm}`}</Text>
            </View>

            <View>
              <Text>{data.company}</Text>
            </View>

            <View>
              <Text>{data.fullDescription}</Text>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

export default(JobDetail);
