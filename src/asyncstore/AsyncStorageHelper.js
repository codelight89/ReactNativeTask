/**
 * Created by user on 18.07.17.
 */
import { AsyncStorage } from 'react-native';

export class AsyncStorageHelper {

  static keys = {
    token: 'token',
  };

  static setToken(token) {
    this.setItem(this.keys.token, token);
  }

  static getToken = async () => this.getItem(this.keys.token)

  static setItem = async (key, val, callback) => {
    try {
      let value = '';
      value = JSON.stringify(val);
      await AsyncStorage.setItem(key, value);
      if (callback) {
        callback();
      }
    } catch (error) {
      console.warn('serviceStorage.setItem error:', error);
      if (callback) {
        callback(error);
      }
    }
  }

  static getItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.warn('serviceStorage.getItem error:', error);
    }
    return null;
  };
}
