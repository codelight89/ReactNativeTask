/**
 * Created by user on 17.07.17.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ListView,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import JobListItem from '../components/JobListItem';

import { Toolbar } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

// import * as actionsLogin from '../redux/actions/actionsLogin';
import * as actionsJobsList from '../redux/actions/actionsJobsList';
import * as actionsRoute from '../redux/actions/actionsRoute';
import { color } from '../constants/color';

const { width, height } = Dimensions.get('window');

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const buttonHeight = 45;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: color.gray,
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

  separator: {
    width,
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.transparent,
  },

  toolbarContainer: {
    backgroundColor: color.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
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

class JobsList extends React.Component {
  static propTypes = {
    getJobs: React.PropTypes.func,
    jobs: React.PropTypes.arrayOf(React.PropTypes.object),
  };

  static defaultProps = {
    getJobs: () => {},
    jobs: [],
  };

  constructor(props) {
    super(props);

    const { getJobs } = this.props;
    getJobs(false);
  }


  onPressMenu = () => {
    Actions.refresh({ key: 'root', open: value => !value });
  };

  onEndReached = () => {
    console.warn('onEndReached');
    this.props.getJobs(true);
  };

  onJobPressed = (rowData) => {
    console.warn('onJobPressed', rowData);
    actionsRoute.pushJobDetail(rowData);
  };

  dismissKeyboard = () => {
    TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
  };

  render() {
    // const { username, password } = this.state;
    // const { authResult, authRequestInProgress } = this.props;
    const { jobs } = this.props;
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.onPressMenu}
          centerElement="Jobs"
          style={{
            container: styles.toolbarContainer,
          }}
        />

        <ListView
          style={styles.container}
          dataSource={dataSource.cloneWithRows(jobs)}
          enableEmptySections
          onRefresh={this.onRefresh}
          renderRow={rowData => (<JobListItem
            item={rowData}
            onPress={() => {
              console.warn('onPress');
              this.onJobPressed(rowData);
            }}
          />)}
          renderSeparator={() => (<View style={styles.separator} />)}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobs: state.reducerJobs.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getJobs: (addToCurrent) => { dispatch(actionsJobsList.getJobs(addToCurrent)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsList);
