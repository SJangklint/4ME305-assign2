import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello there</Text>
      <StatusBar style="auto" />
      <View style={styles.body}>
        <Text>Lorem ipsum ..</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: 'green',
    padding: 20,
  }
});
