// utils/location.js
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão negada!', 'Não foi possível acessar a localização.');
    return null;
  }
  return await Location.getCurrentPositionAsync({});
};

export const watchHeading = async (setHeading) => {
  const subscription = await Location.watchHeadingAsync((headingData) => {
    setHeading(headingData);
  });
  return subscription;
};
