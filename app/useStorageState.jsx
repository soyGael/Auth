import { useEffect, useCallback, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

function useAsyncState(initialValue = [true, null]) {
  return useReducer(
    (state, action = null) => [false, action],
    initialValue
  );
}

export async function setStorageItemAsync(key, value) {
  if (Platform.OS === 'android') {
    try {
      if (value === null) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('AsyncStorage is unavailable:', e);
    }
  } else {
    if (Platform.OS === 'web') {
      try {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    }
  }
}

export function useStorageState(key) {
  // Public
  const [state, setState] = useAsyncState();

  // Get
  useEffect(() => {
    if (Platform.OS === 'android') {
      AsyncStorage.getItem(key).then(value => {
        setState(value);
      });
    } else {
      if (Platform.OS === 'web') {
        try {
          if (typeof localStorage !== 'undefined') {
            setState(localStorage.getItem(key));
          }
        } catch (e) {
          console.error('Local storage is unavailable:', e);
        }
      }
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
