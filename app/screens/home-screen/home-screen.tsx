import React,{useEffect,useContext} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,TouchableOpacity,Button ,View} from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
 import { useStores } from "../../models"
import { color } from "../../theme"

//import AsyncStorage from '@react-native-async-storage/async-storage'
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  justifyContent:"center",
  alignItems:'center'
}
const BUTTON: ViewStyle = {
  backgroundColor: color.palette.white,
  height : 40,
  width:155,
  justifyContent : "center",
  alignItems:"center",
  marginTop :20,
}


export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
   const { userStore } = useStores()
   const navigation = useNavigation()
  // OR
  //const rootStore = useStores()
async function onPress(){

 await  userStore.setValue('','',false);
 
 }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={ROOT} >
      <Text>Logged in using  {userStore.isGoogle ? 'Google' :  'Facebook'}</Text>
      <Text>You are logged in as {userStore.name}</Text>
      <Text>Email : {userStore.email}</Text>
      <TouchableOpacity style={BUTTON} onPress={() => onPress()} >
          <Text style ={{color : color.palette.black}} >Logout</Text>
      </TouchableOpacity>
     
    </View>
  )
})
