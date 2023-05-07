import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar} from 'react-native'
import { titles, colors, btn1, hr80 } from '../../global/styles'
import { AntDesign } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {firebase} from '../../../Firebase/firebaseConfig'

const SignUpScreen = ({navigation}) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [phonefocus, setPhoneFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [cpasswordfocus, setcPasswordfocus] = useState(false);
  
  // taking form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  //console.log(email);

  const [customError, setCustomError] = useState('');
  const [successmsg, setSuccessmsg] = useState(null);

  const handleSignup = () => {
      const FormData = {
          email: email,
          password: password,
          //cpassword: cpassword,
          phone: phone,
          name: name, 
          address: address
      }

      if (password != cpassword) {
        //alert ("Password does not match");
        setCustomError("Password doesn't match!");
      }
      else if (phone.length != 10) {
        setCustomError("Phone number should be 10 digits");
        return;
      }
      try {
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
              //console.log(userCredentials?.user.uid)
              console.log('user created')
              //setSuccessmsg('User created successfully')
              if (userCredentials?.user.uid)  {
                const userRef = firebase.firestore().collection('UserData')

                userRef.add({
                        email: email,
                        password: password,
                        //cpassword: cpassword,
                        phone: phone,
                        name: name, 
                        address: address,
                        uid: userCredentials?.user.uid
                     }).then(() => {
                  console.log('data added to firestore')
                  setSuccessmsg('User created successfully')
                }).catch((error) => {
                    console.log('firestore error', error)
                }
                )
              }
              
          })
          .catch((error) => {
              console.log('sign up firebase error', error.message)
              if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
                setCustomError('Email already exists')
              }
              else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                setCustomError('Invalid Email')
              }
              else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                  setCustomError('Password should be at least 6 characters')
              }
              else {
                setCustomError(error.message)
              }
          })
      }
      catch (error) {
          console.log('sign up system error ', error.message)
      }
  }

  return (
    <View style = {styles.container}>
      <StatusBar/>
      {successmsg == null ? 
      <View style = {styles.container}>
        <Text style = {styles.head1}>Sign Up</Text> 
        {customError !== '' && <Text style = {styles.errormsg}>{customError}</Text>}
        <View style = {styles.inputout}>
            <AntDesign name="user" size={24} color={nameFocus === 
            true ? colors.text1: colors.text2} />
            <TextInput style = {styles.input} placeholder="Full Name"
            onFocus={() => {
              setEmailfocus(false)
              setPasswordfocus(false)
              setShowpassword(false)
              setNameFocus(true)
              setPhoneFocus(false)
              setCustomError('')
            }} 
            onChangeText = {(text) => setName(text)}
            />
        </View>

        <View style = {styles.inputout}>
            <Entypo name="email" size={24} color={emailfocus === 
            true ? colors.text1: colors.text2} />
            <TextInput style = {styles.input} placeholder="Email"
            onFocus={() => {
              setEmailfocus(true)
              setPasswordfocus(false)
              setShowpassword(false)
              setNameFocus(false)
              setPhoneFocus(false)
              setCustomError('')
            }}
            onChangeText = {(text) => setEmail(text)}
             />
        </View>

        <View style = {styles.inputout}>
            <Feather name="smartphone" size={24} color={phonefocus === 
            true ? colors.text1: colors.text2} />
            <TextInput style = {styles.input} placeholder="Phone Number"
            onFocus={() => {
              setEmailfocus(false)
              setPasswordfocus(false)
              setShowpassword(false)
              setNameFocus(false)
              setPhoneFocus(true)
              setCustomError('')
            }}
            onChangeText={(text) => setPhone(text)}
             />
        </View>
        {/*password start */}
        <View style = {styles.inputout}>
            <MaterialCommunityIcons name="lock-outline" size = {24}
            color = {passwordfocus == true ? colors.text1 : colors.
            text2} />
            <TextInput style = {styles.input} placeholder = "password"
            onFocus = {() => {
              setEmailfocus(false)
              setPasswordfocus(true)
              setShowpassword(false)
              setNameFocus(false)
              setPhoneFocus(false)
              setCustomError('')
            }}
            
            onChangeText = {(text) => setPassword(text)}
            secureTextEntry = {showpassword === false ? true: false}
             />

            <Octicons name={showpassword == false ? "eye-closed" : 
            "eye"} size = {24} color = "black" onPress={()=>
            setShowpassword(!showpassword)} />
        </View>
        {/* */}
        <View style = {styles.inputout}>
            <MaterialCommunityIcons name="lock-outline" size = {24}
            color = {cpasswordfocus == true ? colors.text1 : colors.
            text2} />
            <TextInput style = {styles.input} placeholder = "confirm password"
            onFocus = {() => 
            {
              setEmailfocus(false)
              setPasswordfocus(false)
              setShowpassword(true)
              setNameFocus(false)
              setPhoneFocus(false)
            }}
            
            onChangeText={(text) => setcPassword(text)}
            secureTextEntry = {showpassword === false ? true: false}
             />

            <Octicons name={showpassword == false ? "eye-closed" : 
            "eye"} size = {24} color = "black" onPress={()=>
            setShowcpassword(!showcpassword)} />
        </View>
        
        {/*password end */}

        <Text style = {styles.address}>Please enter your address</Text>
        <View style = {styles.inputout}>
            <TextInput style = {styles.input1} placeholder= "Enter your address" 
                      onChangeText = {(text) => setAddress(text)} 
                      onPress = {() => {
                          setEmailfocus(false)
                          setPassword(false)
                          setShowpassword(false)
                          setNameFocus(false)
                          setPhoneFocus(false)
                          setCustomError('')
                      }}
                      />
        </View>

        <TouchableOpacity style = {btn1} onPress = {() => handleSignup()}>
        <Text style = {{color: colors.col1, fontSize: titles.btntext, fontWeight: "bold"}}>Sign Up</Text>
        </TouchableOpacity>

        {/* <Text style = {styles.forgot}>Forgot Password?</Text> */}
        <Text style = {styles.or}>OR</Text>
        <Text style = {styles.gftxt}>Sign In With</Text>

        <View style = {styles.gf}>
          <TouchableOpacity>
            <View style = {styles.gficon}>
              <AntDesign name="google" size = {24} color = "#EA4335" />
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style = {styles.gficon}>
                <FontAwesome5 name = "facebook-f" size = {24}
                color = "#4267B2"/></View>
            </TouchableOpacity>
          
        </View>
        <View style = {styles.hr80}></View>
        <Text>Already have an account?
          <Text style = {styles.signup} onPress={()=>navigation.navigate('login')}> Sign In </Text>
        </Text>
      </View>
      :
      <View style = {styles.container1}>
        <Text style = {styles.successmsg}>{successmsg}</Text>
        <TouchableOpacity style = {btn1} onPress = {() => navigation.navigate('login')}>
        <Text style = {{color: colors.col1, fontSize: titles.btntext, fontWeight: "bold"}}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {btn1} onPress = {() => setSuccessmsg(null)}>
        <Text style = {{color: colors.col1, fontSize: titles.btntext, fontWeight: "bold"}}>Go Back</Text>
        </TouchableOpacity>
      </View>
  
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    //justifyContent: 'center'
    //marginTop: 60
  },
  container1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  head1: {
      fontSize: titles.title1,
      color: colors.text1,
      textAlign: 'center',
      marginVertical: 10
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    //alignSelf: 'center',
    elevation: 20
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
  },
  forgot: {
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10
  },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: 'bold'
  },
  gftxt: {
    color: colors.text2,
    marginBottom: 10,
    fontSize: 25
  },
  gf: {
    flexDirection: 'row'
  },
  gficon: {
    backgroundColor: 'white',
    width: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 20
  },
  signup: {
    color: colors.text1
  },
  address : {
    fontSize: 18,
    color: colors.text2,
    textAlign: "center",
    marginTop: 20
  },
  errormsg : {
      color: 'red',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 10,
      borderColor: 'red',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10
  },
  successmsg: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  }

})

export default SignUpScreen