import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { auth, db } from '../Firebase';

const UpdateHotel = ({navigation}) => {

    const [showIndicator, setShowIncator] = useState(false)

    // ... Updating details of the hotel
    const [image, setImage] = useState('');
    const [hotelName, setHotelName] = useState('');
    const [hotelAddress, setHotelAddress] = useState('');
    const [hotelNumber, setHotelNumber] = useState('');
    const [hotelRating, setHotelRating] = useState('');
    const [hotelInfo, setHotelInfo] = useState('');
         
    const UpdateHotelInfo = () => {
        try {

            //... loader!
            setShowIncator(true)
            setTimeout(() => {
                setShowIncator(false)
                //alert('You Successfully Signed Up!')
            }, 3000)

            const admin = auth?.currentUser?.uid;
            const adminEmail = auth?.currentUser?.email;

            return (
                db.collection('hotel').doc(admin).update({
                    adminUid: admin,
                    adminEmail: adminEmail,
                    hotelName: hotelName,
                    hotelAddress: hotelAddress,
                    hotelNumber: hotelNumber,
                    hotelRating: hotelRating,
                    hotelInfo: hotelInfo,
                    hotelImage: image,
                }).then(() => {
                    navigation.navigate('Dashboard', {adminUid: admin, adminEmail: adminEmail})
                }).catch((error) => {
                    alert(error);
                })
            );
        }catch(error) {
            alert('Failed to update Details! : ' + error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#F02A4B', justifyContent: 'center', alignItems: 'center', height: '30%', }}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 40, elevation: 5}}>Update Hotel</Text>
            </View>
            
            <ScrollView>
                <View style={{backgroundColor: '#FFF', height: '100%', borderRadius: 40, }}>
                    <View style={styles.input} >
                        <Text style={{paddingRight: 220, fontSize: 16, color: '#F02A4B', padding:10}}>Hotel Name</Text>
                        <TextInput 
                            style={styles.inputBox} 
                            placeholder='Lovely Hotel'
                            value={hotelName}
                            onChangeText={hotelName => setHotelName(hotelName)}
                            color='#F02A4B'
                        />
                    </View>
                    <View style={styles.input} >
                        <Text style={{paddingRight: 220, fontSize: 16, color: '#F02A4B', padding:10}}>Hotel Address</Text>
                        <TextInput 
                            style={styles.inputBox} 
                            placeholder='65 Lava street'
                            value={hotelAddress}
                            onChangeText={hotelAddress => setHotelAddress(hotelAddress)}
                            color='#F02A4B'
                        />
                    </View>

                    <View style={styles.input} >
                        <Text style={{paddingRight: 215, fontSize: 16, color: '#F02A4B', padding:10}}>Hotel Telephone</Text>
                        <TextInput
                            style={styles.inputBox} 
                            placeholder='+27 (0)11 000 5555'
                            value={hotelNumber}
                            onChangeText={hotelNumber => setHotelNumber(hotelNumber)}
                            color='#F02A4B'
                        />
                    </View>

                    <View style={styles.input} >
                        <Text style={{paddingRight: 230, fontSize: 16, color: '#F02A4B', padding:10}}>Hotel Rating</Text>
                        <TextInput
                            style={styles.inputBox} 
                            placeholder='5 Star Rating'
                            value={hotelRating}
                            onChangeText={hotelRating => setHotelRating(hotelRating)}
                            color='#F02A4B'
                        />
                    </View>

                    <View style={styles.input} >
                        <Text style={{paddingRight: 230, fontSize: 16, color: '#F02A4B', padding:10}}>Hotel Description</Text>
                        <TextInput 
                            style={styles.inputBox2} 
                            placeholder='Hotel Descriptions'
                            value={hotelInfo}
                            onChangeText={hotelInfo => setHotelInfo(hotelInfo)}
                            color='#F02A4B'
                        />
                    </View>
                    <View style={{paddingTop: 30, paddingBottom: 30}}>
                        {!showIndicator ? 
                            <TouchableOpacity style={styles.touch1} onPress={UpdateHotelInfo}>
                                <Text style={styles.text2}>Update Hotel</Text>
                            </TouchableOpacity>
                        :
                            <ActivityIndicator size='large' color='#F02A4B' />
                        }
                    </View> 
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F02A4B',
    height: '100%',
    width: '100%',
  },
  input: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10
    },
    inputBox: {
        width: '85%',
        borderWidth: 1,
        height: 50,
        borderColor: '#F02A4B',
        paddingLeft: 15,
        borderRadius: 10,
    },
    inputBox2: {
        width: '85%',
        borderWidth: 1,
        height: 120,
        borderColor: '#F02A4B',
        paddingLeft: 15,
        borderRadius: 10,
    },
    touch1: {
        backgroundColor: '#F02A4B',
        width: 220,
        borderRadius: 20,
        padding: 15,
        marginLeft: 70,
    },
    text2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default UpdateHotel
