// components/CustomMap.js
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function CustomMap({ location, routeCoordinates }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="Você está aqui"
        description="Localização atual"
      />
      <Marker
        coordinate={{
          latitude: 40.748817,
          longitude: -73.985428,
        }}
        title="Outro Ponto de Interesse"
      />
      {routeCoordinates.length > 1 && (
        <Polyline coordinates={routeCoordinates} strokeColor="blue" strokeWidth={6} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
