import React,{useContext,useEffect,useState} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,View,Button,Alert , StyleSheet,TouchableOpacity,ActivityIndicator} from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import auth from '@react-native-firebase/auth';
//import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginManager, AccessToken,LoginButton } from 'react-native-fbsdk';
import { useNavigation } from "@react-navigation/native"
import { GoogleSignin,statusCodes } from '@react-native-community/google-signin';
//import {AuthContext} from '../../components/context/context'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent:"center",
  alignItems:"center"
}



export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
 // const {fbLogin} = useContext(AuthContext);
  const [loading,setLoading] =useState(false);
 useEffect(() => {
 GoogleSignin.configure({
  webClientId: '227762341046-1fh90jp3blfbevvkv1oiq7j3rvnmpq5i.apps.googleusercontent.com',
});
 },[])
 const navigation = useNavigation()
  const {userStore} = useStores()
  // OR
  // const rootStore = useStores()
  async function onGoogleButtonPress() {
    // Get the users ID token
    try{
      await GoogleSignin.hasPlayServices();
    const { idToken,user } = await GoogleSignin.signIn();
    userStore.setValue(user.name,user.email,true)
  
  }
    catch(error)
    {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        
      }
    }
  }
 async function initUser(token) {
   setLoading(true);
    await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
   // AsyncStorage.setItem('name',json.name);
      // Some user object has been set up somewhere, build that user here
   userStore.setValue(json.name,json.email,false) ;
       setLoading(false);
    })
    .catch(() => {
      Alert.alert('ERROR GETTING DATA FROM FACEBOOK')
    })
   //navigation.navigate('home',{isGoogle: false});
  }

  const fbLogin =() =>{
    LoginManager.logInWithPermissions(['public_profile'])
    .then(
      function(result) {
        if (result.isCancelled) {
          Alert.alert('Login was cancelled');
        } else {
          
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            initUser(accessToken)
        })
      }
      },
      function(error) {
        Alert.alert('Login failed with error: ' + error);
      }
    );
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={ROOT} >
      {loading ? <ActivityIndicator /> :
      <>
      <View style ={styles.Button}>
      <Button   
      title="Facebook Sign-In"
      onPress={() => fbLogin()}
      />
       </View>
      <Button 
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress()}
      />
     </>}
    </View>
  )
})
const styles = StyleSheet.create({
  Button : {
    marginBottom: 10,
  },
})