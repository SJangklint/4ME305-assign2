import * as Location from "expo-location";


//To find out current position (longitude and latitude)
export const getLongLatsCords = async () => {
  //
  let locationPermission = await Location.requestForegroundPermissionsAsync();

  //
  if (!locationPermission.granted) console.log("Permission to access location was denied");

  let location = await Location.getCurrentPositionAsync({});

  const objLocationInfo = {
    time: location.timestamp,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

  return objLocationInfo;
};
