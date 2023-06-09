import { ScrollView,View, Text, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native'
import React, {useState} from 'react'
import {AntDesign} from '@expo/vector-icons';
import {navbtn, navbtnin, navtbnout, colors, veg, nonveg, btn2, hr80, incdecbtn, indecinput, incdecout} from '../global/styles';
import {firebase} from '../../Firebase/firebaseConfig'


const ProductPage = ({navigation, route}) => {

  const data = route.params;
  //console.log("product page data", data)
  if (route.params ===  undefined) {
    navigation.navigate('home')
  }

  const [quantity, setQuantity] = useState('1');
  const [addOnQuantity, setAddOnQuantity] = useState('0');

  const addToCart = () => {
      //console.log('Add to Cart')
      const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

      const data1 = {data, addOnQuantity: addOnQuantity,Foodquantity : quantity}
      //console.log('data1', data)

      docRef.get().then((doc) => {
          if (doc.exists) {
              docRef.update ({
                  cart : firebase.firestore.FieldValue.arrayUnion(data1)     
             })
             alert('Added to cart')
          }
              else {
                  docRef.set ({
                    cart : [data1],
                  })
                  alert ('Added to cart')
              
          }
      })
    }
  
  const increaseQuantity = () => {
      setQuantity((parseInt(quantity) + 1).toString())
  }
  const decreaseQuantity = () => {
      if (parseInt(quantity) > 1) {
          setQuantity((parseInt(quantity) - 1).toString())
      }
  }
  const increaseAddonQuantity = () => {

      setAddOnQuantity((parseInt(addOnQuantity) + 1).toString())
  }
  const decreaseAddonQuantity = () => {
      if (parseInt(addOnQuantity) > 1) {
          setAddOnQuantity((parseInt(addOnQuantity) - 1).toString())
      }
  }

  //console.log(data.foodAddonPrice);
  //console.log({cart: [{addOnQuantity: addOnQuantity, Foodquantity: quantity, data}]});
  
  const cartData = JSON.stringify({
    cart: [
      {
        addOnQuantity: addOnQuantity,
        foodQuantity: quantity,
        data: data
      }
    ]
  });
  console.log(cartData);
  
  //const cartdata = JSON.stringify({ cart: [{ addOnQuantity: addOnQuantity, Foodquantity: quantity, data }] });

  return (
    <ScrollView>
        <TouchableOpacity onPress = {() => navigation.navigate('home')} 
        style = {navtbnout}>
            <View style = {navbtn}>
                <AntDesign name = "back" size = {24} color = "black" style = 
                {navbtnin} />
             </View>
        </TouchableOpacity>

        <View style = {styles.container1}>
            <View style = {styles.s1}>
                <Image source = {{
                  uri: data.foodImageUrl
                }} style = {styles.cardimgin}/>
            </View>

            <View style = {styles.s2}>
                <View style = {styles.s2in}>
                    <Text style = {styles.head1}>{data.foodName}</Text>
                    <Text style = {styles.head2}>${data.foodPrice}/-</Text>
                </View>
        

            <View style = {styles.s3}>
                <Text style = {styles.head3}>About Food</Text>
                <Text style = {styles.head4}>{data.foodDescription}</Text>
                <View style = {styles.s3in}>
                    {data.foodType == 'veg' ? <Text style = {veg}></Text> :
                    <Text style = {nonveg}></Text>}
                    <Text style = {styles.head5}>{data.foodType}</Text>
                </View>
            </View>

            <View style = {styles.container2}>
                <Text style = {styles.txt1}>Location</Text>
                <Text style = {styles.txt2}>{data.restaurantName}</Text>
                <View style = {styles.container2in}>
                    <Text style = {styles.txt3}>{data.restaurantAddressBuilding}</Text>
                    <View style = {styles.dash}></View>
                    <Text style = {styles.txt3}>{data.restaurantAddressStreet}</Text>
                    <View style = {styles.dash}></View>
                    <Text style = {styles.txt3}>{data.restaurantAddressCity}</Text>
                    <View style = {styles.dash}></View>
                </View>
            </View>

            {data.foodAddonPrice != "" && 
              <View style = {styles.container3}>
                  <View style = {hr80}></View>  
                  <Text style = {styles.txt5}>Add Extra</Text>
                  <View style = {styles.c3in}>
                  <Text style = {styles.text4}>{data.foodAddon}</Text>
                  <Text style = {styles.text4}>{data.foodAddonPrice}</Text>
                </View>
                <View style = {incdecout}>
                    <Text style = {incdecbtn} onPress={() => increaseAddonQuantity()}>+</Text>
                    <TextInput value={addOnQuantity} style = {indecinput}/>
                    <Text style = {incdecbtn} onPress={() => decreaseAddonQuantity()}></Text>
                </View>
              </View>
            }

            <View style = {styles.container3}>
                <View style = {hr80}></View>
                <Text style = {styles.txt3}>Food Quantity</Text>
                <View style = {incdecout}>
                    <Text style = {incdecbtn} onPress={() => increaseQuantity()}>+</Text>
                    <TextInput value={quantity} style = {indecinput}/>
                    <Text style = {incdecbtn} onPress={() => decreaseQuantity()}></Text>
                </View>
            </View>

          </View>

          <View style = {styles.container4}>
              <View style = {styles.c4in}>
                  <Text style = {styles.txt2}>Total Price</Text>
                  {data.foodAddonPrice != "" ? <Text style = {styles.txt5}>
                      {((
                        parseInt(data.foodPrice) * parseInt(quantity)
                      ) + parseInt(addOnQuantity) * parseInt(data.foodAddonPrice)
                      ).toString()}
                  </Text> : 
                    <Text style = {styles.txt6}>
                        {(
                          parseInt(data.foodPrice) * parseInt(quantity) 
                        ).toString()}/-
                    </Text>}
              </View>
              <View style = {hr80}></View>
          </View>

            <View style = {styles.btncont}>
                <TouchableOpacity style = {btn2} onPress = {() => addToCart()}>
                    <Text style = {styles.btntxt}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {btn2}>
                    <Text style = {styles.btntxt} onPress = {() => {
                        navigation.navigate('placeorder', {cartData})
                    }}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View>

    </ScrollView>
  )
}

export default ProductPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center'
      width: '100%',
    },

    container1: {
        // position: 'absolute',
        // top: 0,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardimgin: {
      width: '100%',
      height: '100%',
    },
    s2: {
        width: '100%',
        padding: 20,
    },
    s2in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    head1: {
      fontSize: 30,
      fontWeight: '500',
      color: colors.text1,
      width: 200,
      marginRight: 10,
    },
    head2: {
        fontSize: 50,
        fontWeight: '200',
        color: colors.text3,
    },
    s3: {
        backgroundColor: colors.text1,
        padding: 20,
        borderRadius: 20,
    },
    head3: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.col1,
    },
    head4: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '400',
        color: colors.col1,
    },
    s3in: {
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    head5: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '200',
        marginLeft: 10,
    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    btntxt: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
    },

    container2: {
        width: '100%',
        backgroundColor: colors.col1,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
    },
    txt1: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: '200',
    },
    txt2: {
        color: colors.text3,
        fontSize: 30,
        fontWeight: '200',
        marginVertical: 10,

    },
    container2in: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt3: {
        color: colors.text1,
        fontSize: 16,
        width: '30%',
        textAlign: 'center',
    },
    dash: {
        width: 1,
        height: 20,
        backgroundColor: colors.text1,
        marginHorizontal: 10,
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    txt5: {
        color: colors.text1,
        fontSize: 16,
        textAlign: 'center'
    },
    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    text4: {
        color: colors.text3,
        fontSize: 20,
        marginHorizontal: 10,
    },

    container4: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    c4in: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      alignItems: 'center'
    },
    txt6: {
        color: 'green',
        fontSize: 25,
        textAlign: 'center',
    },
    
    
})