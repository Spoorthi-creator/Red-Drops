import { Text, SafeAreaView, StyleSheet ,Image, TouchableOpacity, View,ImageBackground,Dimensions} from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
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

export default function AddPost({navigation}) {
  const[name,setName]=useState('')
   const[phoneNo,setPhoneNo]=useState('')
    const[email,setEmail]=useState('')
     const[bGroup,setbGroup]=useState('')
     const[ image,setImage]= useState('https://dummyimage.com/300x300/0a2602/fff.png&text=Photo')
     const currentUserId=firebase.auth().currentUser.email
     useEffect(() => {
     fetchImage();
    }); 

   const  pickImage = async () => {
     
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });
     
 
   console.log("Result",result.assets[0].uri);
 
     if (!result.canceled) {
      setImage(result.assets[0].uri );
     
       uploadImage(result.assets[0].uri);
     }
     
     
   };
 
  const uploadImage = async (imageUri) => {
    try{
     // var blobOb = await fetch(imageUri);
     // var blob = await blobOb.blob();
     const blob =await new Promise((resolve,reject)=>{
       const xhr=new XMLHttpRequest();
       xhr.onload=function(){
         resolve(xhr.response);
       }
       xhr.error=function(){
         reject(new TypeError('Network request failed'));
       };
       xhr.responseType='blob';
       xhr.open('GET',imageUri,true)
       xhr.send(null)
     });
     return storageRef = firebase
       .storage()
       .ref().child('userss/'+currentUserId)
       .put(blob)
       .then(() => {
         fetchImage();
       })}
       catch(error)  {
         console.log(error);
       };
   };
  const fetchImage = async () => {
     await firebase
       .storage()
       .ref().child('userss/'+currentUserId)
       .getDownloadURL()
       .then((url) => {
        setImage(yrl)
       })
       .catch((e) => {
         console.log(e);
       });
   };

 const createPost=async()=>{
   await
  
   // Signed in
   db.collection("posts").add({
     name: name, 
     email: email, 
     phoneNo: phoneNo,
     uid:firebase.auth().currentUser.uid,
     bGroup:bGroup,
     
     })

     alert("Post Created!")
     navigation.navigate('Home')
   // ...


 
  }
  return (
    <ImageBackground style={styles.img} source={require("../assets/post.png")} resizeMode='cover'>
    <SafeAreaView style={styles.container}>
 
   <View style={{marginTop:screenWidth/2.3}}>
   <Avatar
            containerStyle={{
              alignSelf: "center",
              width: 100,
              height:100,
              borderWidth:2,
              borderColor:'white',
              
            }}
            rounded
            source={{ uri: image }}
            size="small"
            onPress={() => {
              pickImage()
            }}
          />
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
      placeholder='Blood Group Needed'
      leftIcon={
      <MaterialCommunityIcons name="blood-bag" size={20} color="black" />
      }
       value={bGroup}
      onChangeText={(text)=> setbGroup(text)}
    />
    
  </View>
   <TouchableOpacity style={{backgroundColor:'#FF3131',width:'50%',alignSelf:'center',borderRadius:30} }onPress={()=>createPost()}>
        <Text style={{textAlign:'center',padding:2,  fontSize:20,color:'white'}}>Create Post</Text>
      </TouchableOpacity>

    
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
