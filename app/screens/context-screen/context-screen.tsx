import React,{useEffect,useContext} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
 import { useStores } from "../../models"
import { color } from "../../theme"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { WelcomeScreen, DemoScreen, LoginScreen, HomeScreen } from ".."
import { CalendarScreen } from "../calendar-screen/calendar-screen"
//import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { MapScreen } from "../map-screen/map-screen"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

//const  AuthContext = React.createContext();
export const ContextScreen = observer(function ContextScreen() {
  // Pull in one of our MST stores
  const { userStore} = useStores();
  // OR
  
  
  // const rootStore = useStores()
  const Stack = createNativeStackNavigator()
  const Rootstack =() =>{
    const RootStack = createNativeStackNavigator()
    return(
    <Stack.Navigator
    //initialRouteName="login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
     
        <Stack.Screen name="login" component={LoginScreen} />
      
    </Stack.Navigator>
    )
  }
  const AppStack =() =>{
    const AppStack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()
    return(

    <Tab.Navigator
    initialRouteName="home"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,

      }}
    >
     
     <Tab.Screen name="home" component={HomeScreen} options={{headerShown : false
      ,tabBarLabel: 'Home',
      tabBarIcon: ({ color }) => (
        <Icon name="ios-home" color={color} size={26} />
      ),
    }}/>
      <Tab.Screen name="calendar" component={CalendarScreen} options={{tabBarLabel: 'Calendar',
      tabBarIcon: ({ color }) => (
        <Icon name="ios-calendar" color={color} size={26} />
      ),}} />
      <Tab.Screen name="map" component={MapScreen} 
      options={{
        tabBarLabel: 'Map',
      tabBarIcon: ({ color }) => (
        <Icon name="pin" color={color} size={26} />
      ),
      }}/>
      
    </Tab.Navigator>
    )
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
  
   <NavigationContainer independent={true}>
     {userStore.name === '' ?
        <Rootstack />
      :(
       <AppStack />
      )
     }

       </NavigationContainer>
  
  )
})
