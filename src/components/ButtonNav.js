import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '../global/styles'
import {FontAwesome5} from '@expo/vector-icons';

const ButtonNav = ({navigation}) => {
  return (
    <View style = {styles.container}>
        <View style = {styles.btncon1}>
            <AntDesign name = "home" size = {24} color = "black" style = {styles.icon1}
              onPress = {() => navigation.navigate('home')}
            />

        </View>

        <View style = {styles.btncon2}>
            <Ionicons name = "search" size = {40} color = "black" style = {styles.icon2} 
            onPress = {()=> {navigation.navigate('home')}} />

        </View>

        <View style = {styles.btncon1}>
            <AntDesign name = "shoppingcart" size = {30} color = "black" style = {styles.icon1}
            onPress = {() => {navigation.navigate('cart')}} />

        </View>

        <View style = {styles.btncon1}>
            <FontAwesome5 name = "map-marked-alt" size = {30} color = "black" style = {styles.icon1}
             onPress = {() => {navigation.navigate('trackorders')}} />

        </View>

    
    </View>
  )
}

export default ButtonNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: colors.text1,
        borderTopWidth: 0.5,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    
    icon1: {
        color: colors.text1,
    },
    icon2: {
        color: 'white'
    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -20,
        backgroundColor: colors.text1,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    btncon1: {
        // alignItems: 'center',
        backgroundColor: colors.col1,
        elevation: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})