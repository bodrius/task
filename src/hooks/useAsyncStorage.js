import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = () => {
  const setStorage = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      throw e;
    }
  };

  const getStorageItem = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
    }
  };
  const removeStorageItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      throw e;
    }
  };
  const allStorageKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (e) {
      throw e;
    }
  };

  return {setStorage, getStorageItem, removeStorageItem, allStorageKeys};
};
