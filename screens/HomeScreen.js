// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomMap from '../components/CustomMap';
import RouteButton from '../components/RouteButton';
import { getLocation, watchHeading } from '../utils/location';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const addRoute = () => {
    if (location) {
      setRouteCoordinates([
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: -5.077526, longitude: -42.800946 },
      ]);
    } else {
      Alert.alert('Localização não disponível', 'Espere até que a localização seja carregada.');
    }
  };

  useEffect(() => {
    let headingSubscription;

    const initializeLocation = async () => {
      const loc = await getLocation();
      if (loc) setLocation(loc);
    };

    const initializeHeading = async () => {
      headingSubscription = await watchHeading(setHeading);
    };

    initializeLocation();
    initializeHeading();

    return () => {
      if (headingSubscription) headingSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <CustomMap location={location} routeCoordinates={routeCoordinates} />
      ) : (
        <Text style={styles.loadingText}>Carregando localização...</Text>
      )}
      <RouteButton onPress={addRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
