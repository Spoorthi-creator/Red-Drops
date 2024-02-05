import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from 'firebase'
import firebaseConfig from '../Firebase';

// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}

const db = firebase.firestore()

export default class Loading extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }


  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("Splash");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});