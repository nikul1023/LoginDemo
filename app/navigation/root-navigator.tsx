/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React,{useContext,useEffect,useState} from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import auth from '@react-native-firebase/auth';
import { useStores } from "../models"
//import {AuthContext} from '../components/context/context';
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { PrimaryNavigator,SecondNavigator } from "./primary-navigator"
import { observer } from "mobx-react-lite";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  primaryStack: undefined

}

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = observer(() => {
 
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,

        stackPresentation: "modal",
      }}
    >
      <Stack.Screen
        name="primaryStack"
        component={PrimaryNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
})

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const {userStore} = useStores()
  // const {user, setUser} = useContext(AuthContext);
  // const [initializing, setInitializing] = useState(true);

  // const onAuthStateChanged = (user) => {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;
  return (
    <NavigationContainer {...props} ref={ref}>
      
      <RootStack />
    
  

    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
