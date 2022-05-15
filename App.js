import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MobileCamera } from "./src/comps/MobileCamera";
import { Map } from "./src/comps/Map";

const Tab = createBottomTabNavigator();

//This is the homescreen/startpage
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.body}>
          <Text>Hi there!</Text>
                    <Text>This app is built in React Native. 
            In this app you can:
          </Text>
          <Text>- Locate yourself in Google Maps</Text>
          <Text>- Take photos with your mobile camera</Text>
          <Text>- Save your created photo to the media gallery</Text>
          <Text>- Upload your taken photo to Imgbb together with information about the location of where your photo was taken (longitude and latitude)</Text>
        </View>
      </View>
    </View>
  );
}

// Sets up tab-navigation for the app
const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home" size={24}></Ionicons>;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: () => {
            return <FontAwesome5 name="map-marked" size={24} color="black" />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Camera"
        component={MobileCamera}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="camera" size={24}></Ionicons>;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  body: {
    backgroundColor: "pink",
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    width: 300,
    
  },
});
