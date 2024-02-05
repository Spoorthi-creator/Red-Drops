import { Text, SafeAreaView, StyleSheet ,Image, TouchableOpacity, View,ImageBackground,Dimensions} from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
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

export default function Register({navigation}) {
  const[name,setName]=useState('')
   const[phoneNo,setPhoneNo]=useState('')
    const[email,setEmail]=useState('')
     const[bGroup,setbGroup]=useState('')
      const[cDisease,setCDisease]=useState('')
       const[operartion,setOperation]=useState('')
        const[password,setPassword]=useState('')


 const register=async()=>{
   await
   firebase.auth().createUserWithEmailAndPassword(email, password)
 .then((userCredential) => {
   // Signed in
   db.collection("users").add({
     name: name, 
     email: email, 
     phoneNo: phoneNo,
     uid:firebase.auth().currentUser.uid,
     bGroup:bGroup,
     cDisease:cDisease,
     operartion:operartion
     })

     alert("Registered!")
     navigation.navigate('Home')
   // ...
 })
 .catch((error) => {
  
   var errorMessage = error.message;
   alert(errorMessage)
   // ..
 });
 
  }
  return (
    <ImageBackground style={styles.img} source={require("../assets/profileeee.png")} resizeMode='cover'>
    <SafeAreaView style={styles.container}>
 
   <KeyboardAwareScrollView style={{marginTop:screenHeight/6}}>
     <Input
      placeholder='Name'
      leftIcon={
       <Ionicons name="person-circle" size={20} color="black" marginTop />
      }
      value={name}
      onChangeText={(text)=> setName(text)}
    />
    <Input
      placeholder='Phone Number'
      leftIcon={
      <FontAwesome name="mobile-phone" size={20} color="black" />
      }
       value={phoneNo}
      onChangeText={(text)=> setPhoneNo(text)}
    />
    <Input
      placeholder='Email'
      leftIcon={
      <Entypo name="email" size={20} color="black" />
      }
       value={email}
      onChangeText={(text)=> setEmail(text)}
    />
     <Input
      placeholder='Blood Group'
      leftIcon={
      <MaterialCommunityIcons name="blood-bag" size={20} color="black" />
      }
       value={bGroup}
      onChangeText={(text)=> setbGroup(text)}
    />
     <Input
      placeholder='Sufferrinng from any Chronic Diseases'
      leftIcon={
      <MaterialIcons name="sick" size={20} color="black" />
      }
       value={cDisease}
      onChangeText={(text)=> setCDisease(text)}
    />
    <Input
      placeholder='Have/Had operation in 3 months'
      leftIcon={
      <MaterialCommunityIcons name="blood-bag" size={20} color="black" />
      }
       value={operartion}
      onChangeText={(text)=> setOperation(text)}
    />
     <Input
      placeholder='Password'
      leftIcon={
    <Entypo name="key" size={20} color="black" />
      }
       value={password}
      onChangeText={(text)=> setPassword(text)}
    />
      <TouchableOpacity style={{backgroundColor:'#FF3131',width:'50%',alignSelf:'center',borderRadius:30,opacity:0.8} }onPress={()=>register()}>
        <Text style={{textAlign:'center',padding:2,  fontSize:20,color:'white'}}>REGISTER</Text>
      </TouchableOpacity>

       <TouchableOpacity style={{ marginTop:10, }}onPress={()=> navigation.navigate('Login')}>
        <Text style={{textAlign:'center', fontSize:15}}>Already Registered?Login</Text>
      </TouchableOpacity>
  </KeyboardAwareScrollView>
 
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },

    img:  {
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%' ,
    width: '100%',
    borderRadius: 20,
  },
});
