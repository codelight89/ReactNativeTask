/**
 * Created by user on 17.07.17.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Spinner = () => (<View style={styles.container}>
  <ActivityIndicator />
</View>);

export default Spinner;