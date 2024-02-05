import { Text, SafeAreaView, StyleSheet ,Image, TouchableOpacity, View,ImageBackground,Dimensions,Alert} from 'react-native';
import { Input } from 'react-native-elements';

import { Entypo } from '@expo/vector-icons';
import {useState} from 'react'
import firebase from 'firebase';
import firebaseConfig from '../Firebase';
const screenHeight=Dimensions.get('window').height;
const screenWidth=Dimensions.get('window').width;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}


const db = firebase.firestore();

export default function Login({navigation}) {

    const[email,setEmail]=useState('')
    
        const[password,setPassword]=useState('')
 const login=async()=>{
      if (email != "" && password != ""){
           firebase.auth().signInWithEmailAndPassword(email, password)
           .then((userCredential) => {
               navigation.replace("Home")
               Alert.alert("Welcome back!")
 })
           .catch((error) => {
               var errorMessage = error.message;
               Alert.alert(errorMessage)
 });
       } else {
           Alert.alert("Please fill the above details")
       }
  }
  return (
    <ImageBackground style={styles.img} source={require("../assets/profileeee.png")} resizeMode='cover'>
    <SafeAreaView style={styles.container}>
 
   <View style={{marginTop:screenHeight/3}}>

    <Input
      placeholder='Email'
      leftIcon={
      <Entypo name="email" size={20} color="black" />
      }
       value={email}
      onChangeText={(text)=> setEmail(text)}
    />


     <Input
      placeholder='Password'
      leftIcon={
   <Entypo name="key" size={20} color="black" />
      }
       value={password}
      onChangeText={(text)=> setPassword(text)}
    />
  </View>
   <TouchableOpacity style={{backgroundColor:'#FF3131',width:'50%',alignSelf:'center',borderRadius:30,opacity:0.8} }onPress={()=>login()}>
        <Text style={{textAlign:'center',padding:2,  fontSize:20,color:'white'}}>LOGIN</Text>
      </TouchableOpacity>

       <TouchableOpacity style={{ marginTop:10, }}onPress={()=> navigation.navigate('Register')}>
        <Text style={{textAlign:'center', fontSize:15}}>New User?</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  label: {
   
    textAlign: 'center',
    marginTop: 30,
    fontSize:35,
  }, 
    img:  {
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%' ,
    width: '100%',
    borderRadius: 20,
  },
});
