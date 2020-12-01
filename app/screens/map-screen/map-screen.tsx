import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import MapView,{Marker} from 'react-native-maps';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const MAP : ViewStyle ={
  height:'100%',
  width :'100%',
}

export const MapScreen = observer(function MapScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View >
       <MapView style={MAP}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <Marker coordinate={{ latitude:37.78825 , longitude: -122.4324 }} />
  </MapView>
  </View>
    </Screen>
  )
})
