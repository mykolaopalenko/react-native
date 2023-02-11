import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { styles } from './MapScreen.styled';

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (route.params) {
      setLocation({ ...route.params });
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude ? location.latitude : 30,
          longitude: location.longitude ? location.longitude : 30,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={10}
      >
        <Marker
          title={location.place}
          coordinate={{
            latitude: location.latitude ? location.latitude : 0,
            longitude: location.longitude ? location.longitude : 0,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
