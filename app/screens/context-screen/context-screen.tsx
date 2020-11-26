import React,{useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
 import { useStores } from "../../models"
import { color } from "../../theme"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { WelcomeScreen, DemoScreen, LoginScreen, HomeScreen } from ".."
//import AsyncStorage from '@react-native-async-storage/async-storage'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}


export const ContextScreen = observer(function ContextScreen() {
  // Pull in one of our MST stores
  const { userStore} = useStores();
  // OR
  
  
  // const rootStore = useStores()
  const Stack = createNativeStackNavigator()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Stack.Navigator
    //initialRouteName="login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
     {userStore.name === '' ?
        <Stack.Screen name="login" component={LoginScreen} />
      :
        <Stack.Screen name="home" component={HomeScreen} />
     }
       
      
     

    </Stack.Navigator>
  )
})
