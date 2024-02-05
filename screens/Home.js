import { Text, SafeAreaView, StyleSheet ,Image, TouchableOpacity, View,FlatList,Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useState} from 'react'
import firebase from 'firebase';
import firebaseConfig from '../Firebase';
import {useEffect} from 'react'
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}

const db = firebase.firestore();

export default function Home({navigation}) {
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[bloodG,setBloodG]=useState('')
  const [posts,setPosts]=useState([])

  


  const getUserInfo =() => {
     db.collection('users')
      .where('uid', '==', firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
         setName(doc.data().name);
         setBloodG(doc.data().bGroup)
          setEmail(doc.data().email)
        
        });
      });
  };
  
   const getPosts=() => {
        const user = firebase.auth().currentUser;

   

    db.collection('posts').onSnapshot((snapshot) => {
      var allP = [];
      snapshot.docs.map((doc) => {
        var profile = doc.data();
        profile.id = doc.id;
        allP.push(profile);
      })
  setPosts(allP)
     
    });
    }

useEffect(() => {
    getUserInfo()
    getPosts()
    console.log("Email", email)
    console.log("Logged in", firebase.auth().currentUser.email)
  });
  renderItem = ({ item }) => {
    return(
      <View style={{marginTop: 30, backgroundColor: '#FA8072', borderRadius: 10, flex: 1, marginLeft: 10, marginRight: 10,flexDirection:'row',justifyContent:'space-between'}}>
      
     <View>
      <Text style={{fontFamily:'font', color: '#0F4392',margin:5}}> Name: {item.name} </Text>
      <Text style={{marginTop:10, fontFamily: 'font', color: '#0F4392',margin:5}}>Required blood Group: <Text style={{fontWeight:'bold'}}>{item.bGroup}</Text> </Text>
        <Text style={{fontFamily: 'font', color: '#0F4392',margin:5}}> Email: {item.email} </Text>
          <Text style={{fontFamily: 'font', color: '#0F4392',margin:5}}> Phone number: {item.phoneNo} </Text>
    </View>
      <TouchableOpacity style={{marginRight:10,alignSelf:'center'}} onPress={()=>Linking.openURL('mailto:' +item.email+ 'subject=Response on the Post&body=I would like to donate blood') 
     }>
      <Fontisto name="blood-drop" size={24} color="red" />
      <Text style={{marginRight:10,textAlign:'center'}}>Donate</Text>
      </TouchableOpacity>
    
      </View>
    );
  };

    emptylist=()=>{
        return(
          <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
      <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center'}} > No profiles at the moment.Please click on the '+' icon to create a post</Text>
      </View>
        ) 
      }

     const logout =()=> {
        firebase.auth().signOut().then(() => {
      navigation.navigate('Splash')
      alert("Logged out successfully")
    }).catch((error) => {
      alert('Error logging out!')
    });
      }

  return (
    <SafeAreaView style={styles.container}>
  <View style={{backgroundColor:'red',borderBottomLeftRadius:20,borderBottomRightRadius:20,height:150}} >

  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
  <Text style={{color:'white',margin:20,fontSize:18}}>Hello, {name}</Text>
  <TouchableOpacity onPress={()=> logout()} style={{margin:20}}>
  <MaterialCommunityIcons name="logout" size={24} color="white" />
  </TouchableOpacity>
  </View>
 
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <Text style={{color:'white',marginTop:5,marginLeft:20}}>Hope you are doing well today!</Text>
  <View style={{backgroundColor:'white',height:50,width:50,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
  <Text style={{color:'black',textAlign:'center',fontSize:20,fontWeight:'bold'}}>{bloodG}</Text>
  
  </View>
  </View>
  </View>
  <View style={{}}>
  <Text style={{margin:10,fontSize:20,fontWeight:'bold'}}>Donation Request</Text>
   <FlatList 
                       ListEmptyComponent={()=>emptylist()}
                        scrollEnabled
                        data = {posts}
                        renderItem={renderItem}
                        keyExtractor={(item, index)=>index.toString()}/> 
  </View>
   <TouchableOpacity onPress= {()=> navigation.navigate('AddPost')}
   style={styles.float}>
   <Feather name="plus-square" size={35} color="black" />
   </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    backgroundColor: 'yellow',
    textAlign: 'center',
    marginTop: 30,
    fontSize:30,
  },
  float:  {
    height:60,
    width:60,
    right:20,
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    bottom: 20,
    backgroundColor:'white',
    borderRadius:40,
  }
});
