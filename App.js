import { Text, SafeAreaView, StyleSheet ,Image, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './screens/Splash';
import Register from './screens/Register'; 
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import AddPost from './screens/AddPost';
import Loading from './screens/Loading';
import Login from './screens/Login';
import firebase from 'firebase'
import firebaseConfig from './Firebase';
// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
  
}
const db = firebase.firestore()

const Stack = createStackNavigator();
// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <MyStack/>
  </SafeAreaView>
  );
}

function MyStack() {
  return (
    <NavigationContainer >
    <Stack.Navigator>
     <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}} />
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
       <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="AddPost" component={AddPost} options={{headerShown:false}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
   backgroundColor: 'red',
    padding: 8,
  },
});
