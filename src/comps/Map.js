import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

// Initiates map
export const Map = () => {
    const [currentLocation, setCurrentLocation] = useState({
        coords: {
            latitude: 0,
            longitude: 0
        },
        timestamp: null
    });

    // Asks for location permission and gets current position
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Permission to access location was denied")
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location)
        })();
    }, []);
    
    // Renders the map by use of react-native-maps
    return (
        <MapView
            style={{ flex: 1}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation = {true}
            region={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.0742,
                longitudeDelta: 0.0534
            }}>
        </MapView>
    );
}
