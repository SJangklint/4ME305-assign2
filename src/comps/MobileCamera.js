import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { getLongLatsCords } from "./UploadData.js";
import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;

export const MobileCamera = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  // Asks for permissions to access the mobile camera and library
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  // permissions
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  // Function for taking pictures with the mobile camera
  let takePic = async () => {
    let options = {
      base64: true,
      exif: true,
      quality: 1,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    // updates the photo-object
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = async () => {
      // destructs getLongLatsCords fetched object
      const { time, latitude, longitude } = await getLongLatsCords();

      // creates a Date-class that converts timestamp (seconds) to custom formats
      let date = new Date(time);

      // adds the new date-formats
      let newDate = `\n${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      // text content to later be stored in the json-file
      let newString = `Time:\n${newDate}\n\nLatitude:\n${latitude}\n\nLongitude\n${longitude}`;

      // THIS ONLY WORKS WITH ANDROID
      const saveFileToPhoneStorage = async () => {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        // Check if permission granted
        if (permissions.granted) {
          // Get the directory uri that was approved
          let directoryUri = permissions.directoryUri;

          let fileName = `file_with_time_lat_long_id${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

          // Create file and pass it's SAF URI
          await StorageAccessFramework.createFileAsync(directoryUri, fileName, "application/json")
            .then(async (fileUri) => {
              // Save data to newly created file
              await FileSystem.writeAsStringAsync(fileUri, newString, { encoding: FileSystem.EncodingType.UTF8 });
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          alert("You must allow permission to save.");
        }
      };

      // trigger the function and saves a .json-file to the phone storage with time-lat-lon-information
      saveFileToPhoneStorage();

      // saves the image to the phone storage
      MediaLibrary.saveToLibraryAsync(photo.uri);
    };

    //Function for uploading a new image to sociala media (imgbb)
    let newUploadPhoto = async () => {
      const fetchIMGBB = async () => {
        const { time, latitude, longitude } = await getLongLatsCords();
        let date = new Date(time);
        const imageName = `IMG${date.getSeconds()}-Lat${latitude}-Lon${longitude}`;

        const apiKey = `1dbd506404632c87ebd57dd77cac719f`;
        const urlUploadStandard = `https://api.imgbb.com/1/upload`;

        let formData = new FormData();
        formData.append("key", apiKey); // req
        formData.append("image", photo.base64); // req
        formData.append("name", imageName); // opt

        await fetch(urlUploadStandard, {
          method: "POST" /* create */,
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {})
          .catch(console.error);
      };

      ///////////////////////////////////////////////////
      await fetchIMGBB();
      ///////////////////////////////////////////////////
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.buttonContainer}>
          {/* <Button style={styles.shareBtn} title="Share" onPress={sharePic} /> */}
          {hasMediaLibraryPermission ? <Button style={styles.saveBtn} title="Save" onPress={savePhoto} /> : undefined}
          {hasMediaLibraryPermission ? <Button style={styles.uploadBtn} title="Upload to imgbb" onPress={newUploadPhoto} /> : undefined}
          <Button style={styles.returndBtn} title="Back to camera" onPress={() => setPhoto(undefined)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.container} ref={cameraRef}>
        <View style={styles.takepicBtn}>
          <Button title="Take Photo" onPress={takePic} />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  takepicBtn: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    borderRadius: 5,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "transparent",
  },
});
