import React,{useState,useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,View,Text,Button} from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color ,typography} from "../../theme"
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent :'center',
  alignItems:'center',
  
}

export const CalendarScreen = observer(function CalendarScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const markDay = ['2020-11-20','2020-11-22'];
  const [marked ,setMarked] = useState();
   useEffect(() => {
    const obj = markDay.reduce((c, v) => Object.assign(c, {[v]: {marked: true}}), {});
    setMarked(obj); 
   }, [])
  
   const [isModalVisible, setModalVisible] = useState(false);
  
   const toggleModal = () => {
     setModalVisible(!isModalVisible);
   };
  const maxdate  = '2020-11-25';
  const mindate  = '2020-11-03';
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Button title='Open Calendar' onPress={toggleModal} />
      <Modal isVisible={isModalVisible} onBackdropPress={() =>{setModalVisible(!isModalVisible)}}>
     <Calendar 
     hideExtraDays={true}
   minDate ={ mindate}
    maxDate ={maxdate}
     onDayPress={(day) => {
       const str = day.year + '-' + day.month + '-' + day.day ;
       markDay.push(str);
       setModalVisible(!isModalVisible);
      
     }}
     theme={{
     
      
      arrowColor:color.palette.black,
      
      monthTextColor: color.primary,
      'stylesheet.day.basic' :
      {
        base: {
          width: 32,
          height: 32,
          alignItems: 'center',
          borderWidth : 1,
          borderColor : color.palette.black,
        }
      },
      textDayFontFamily: typography.code,
      // textMonthFontFamily: 'monospace',
      // textDayHeaderFontFamily: 'monospace',
      // textDayFontWeight: '300',
      // textMonthFontWeight: 'bold',
      // textDayHeaderFontWeight: '300',
      // textDayFontSize: 16,
      // textMonthFontSize: 16,
      // textDayHeaderFontSize: 16
    }}
     disableMonthChange={false}
     markedDates={marked}
     />
     </Modal>
    </Screen>
  )
})
