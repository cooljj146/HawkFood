import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import {colors} from '../global/styles'

const HomeHeadNav = ({navigation}) => {
  return (
    <View style = {styles.container}>
      <Fontisto name="nav-icon-list-a" size={24} color="black" style = {styles.myicon}/>
      <View style = {styles.containerin}>
        <Text style={styles.mytext}>Food</Text>
        <MaterialCommunityIcons name="food-outline" size={26} color="black" style={styles.myicon} />
      </View>
      <TouchableOpacity onPress = {() => navigation.navigate('userprofile')}>
          <FontAwesome5 name="user-circle" size={26} color="black" style={styles.myicon} />
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeadNav

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      padding: 10,
      alignItems: 'center',
      backgroundColor: colors.col1,
      elevation: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
  },
  containerin: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mytext: {
    color: colors.text1,
    fontSize: 34
  },


})