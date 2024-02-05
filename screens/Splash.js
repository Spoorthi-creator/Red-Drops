import { Text, SafeAreaView, StyleSheet ,Image, TouchableOpacity} from 'react-native';

export default function Splash({  navigation  }) {
  return (
    <SafeAreaView style={styles.container}>
    <Image style={styles.img} source={require("../assets/abc.jpg")} resizeMode='cover'></Image> 
      <Text style={styles.paragraph}>
        Donate Blood
      </Text>
      <Text style={styles.head}>
       A drop of blood of yours can bring happiness to other's life.
      </Text>
      <TouchableOpacity style={styles.btn }onPress={()=> navigation.navigate('Register')}>
        <Text style={{textAlign:'center',padding:7}}>Create Registration</Text>
      </TouchableOpacity>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',//
    backgroundColor: 'red',
   // padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    borderWidth:2,
    borderColor:'red',
  },
  img:  {
    justifyContent: 'center',
    alignSelf: 'center',
    height: '65%' ,
    width: '100%',
    borderRadius: 20,
  },
  btn: {
    justifyContent:'center',
    backgroundColor: 'white',
    width: '48%',
    alignSelf:'center',
    height:50,
    borderRadius:30,
    marginTop: 10,
  },
  head: {
    margin: 24,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
   
  },
});
