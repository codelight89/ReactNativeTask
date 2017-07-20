import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableHighlight,
    Text,
} from 'react-native';
import { color } from '../constants/color';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  item: {
    flex: 1,
    width,
    backgroundColor: color.white,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  smallGray: {
    fontSize: 14,
    color: color.grayDark,
    paddingVertical: 4,
  },

  regularText: {
    paddingVertical: 4,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});

export default class ListItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      role: React.PropTypes.string,
      city: React.PropTypes.string,
      updated: React.PropTypes.string,
      fullDescription: React.PropTypes.string,
      company: React.PropTypes.string,
      experience: React.PropTypes.string,
    }),

    onPress: React.PropTypes.function,
  };

  static defaultProps = {
    item: {
      role: '',
      city: '',
      updated: '',
      fullDescription: '',
      company: '',
      experience: '',
    },
    onPress: () => {},
  };

  render() {
    const {
            role,
            city,
            updated,
            fullDescription,
            company,
            experience,
        } = this.props.item;

    const onPress = this.props.onPress;
    return (
      <TouchableHighlight onPress={onPress}>

        <View style={styles.item}>

          <Text numberOfLines={2} style={styles.title}>{role}</Text>
          <Text style={styles.regularText}>{city}</Text>
          <Text style={styles.grayDark}>{company}</Text>
          <Text numberOfLines={4} style={styles.regularText}>{fullDescription}</Text>
          <Text style={styles.regularText}>{experience}</Text>
          <Text style={styles.grayDark}>{updated}</Text>

        </View>

      </TouchableHighlight>
    );
  }
}
