import React, { useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

import { db, auth, } from '../Firebase';
import Checkbox from 'expo-checkbox';
import { ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const AddRoom = ({navigation, route}) => {
    // ...
    const [showIndicator, setShowIncator] = useState(false)

    // ...
    const [image, setImage] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomPrice, setRoomPrice] = useState('');

    // ... checkbox useState
    const [isWifi, setWifi] = useState(false);
    const [isTelevision, setTelevision] = useState(false);
    const [isBathTub, setBathTub] = useState(false);
    const [isShower, setShower] = useState(false);
    const [isBalcony, setBalcony] = useState(false);
    const [isMiniBar, setMiniBar] = useState(false);
    const [isSatelite, setSatelite] = useState(false);
    const [isAirCon, setAirCon] = useState(false);
    const [isKitchen, setKitchen] = useState(false);

    // ...add hotel information of the current hotel admin to firebase
    const AddRoomDetails = () => {

        const admin = auth?.currentUser?.uid;
        const adminEmail = auth?.currentUser?.email;

        navigation.navigate('Dashboard', {adminUid: admin});

        setShowIncator(true)
        setTimeout(() => {
            setShowIncator(false)
            alert('Successfully Added Hotel Room!')
        }, 3000)

        return (
            db.collection('rooms').add({
                //hotelName: hotelName,
                adminUid: admin,
                adminEmail: adminEmail,
                roomImage: image,
                roomName: roomName,
                roomPrice: roomPrice,
                roomDescription: roomDescription,

                wifi: isWifi,
                tv: isTelevision,
                bathTub: isBathTub,
                balcony: isBalcony,
                miniBar: isMiniBar,
                shower: isShower,
                dstv: isSatelite,
                aircon: isAirCon,
            }).catch((error) => {
                alert(error);
            })
        );
    }

   // ... picking image from device and storing it to firebase storage
	const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
        setImage(result.uri);
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
            resolve(xhr.response);
            };
            xhr.onerror = function () {
            reject(new TypeError("Network request failed!"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", result.uri, true);
            xhr.send(null);
        });

        const ref = storageRef.child(new Date().toISOString());
        const snapshot = (await ref.put(blob)).ref
            .getDownloadURL()
            .then((imageUrl) => {
            setImage(imageUrl);

            blob.close();
            });
        }
    }; //... close tag

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#F02A4B', justifyContent: 'center', alignItems: 'center', height: '20%', borderRadius: 20, elevation: 5,}}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 30}}>Add Hotel Rooms</Text>
            </View>
            <ScrollView>
                <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: '15%', height: '90%'}}>
                        <View style={{}}>
                            <TouchableOpacity onPress={pickImage}>
                                <Image style={styles.image} source={{uri: image}} value={image}/>
                                <FontAwesome name="camera" size={24} color='#000' style={{marginLeft: 80, marginTop: -22}}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.input} >
                            <TextInput 
                                style={styles.inputBox} 
                                placeholder='Room Name'
                                color='#F02A4B'
                                value={roomName}
                                onChangeText={roomName => setRoomName(roomName)}
                            />
                        </View>

                        <View style={styles.input} >
                            <TextInput 
                                style={styles.inputBox} 
                                placeholder='Room Price'
                                color='#F02A4B'
                                value={roomPrice}
                                onChangeText={roomPrice => setRoomPrice(roomPrice)}
                            />
                        </View>

                        <View style={styles.input} >
                            <TextInput 
                                style={styles.inputBox2} 
                                placeholder='Room description'
                                color='#F02A4B'
                                value={roomDescription}
                                onChangeText={roomDescription => setRoomDescription(roomDescription)}
                            />
                        </View>

                        <View style={{flexDirection: 'row', paddingTop: '5%',}}>
                            
                        </View>

                        {!showIndicator ?
                            <View style={{paddingTop: '10%',}}>
                                <TouchableOpacity style={styles.touch1} onPress={AddRoomDetails}>
                                    <Text style={styles.text2}>Add details</Text>
                                </TouchableOpacity>
                            </View>
                        :
                            <ActivityIndicator size='large' color='#F02A4B' />
                        }
                         
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 200,
    borderWidth: 2,
    backgroundColor: "#F02A4B"
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
    section: {
        flexDirection: 'row',

    },
    checkbox: {
        margin: 10,
        borderColor: '#F02A4B'
    },
    paragraph: {
        marginTop: 12,
        color: '#F02A4B'
    },
     touch1: {
        backgroundColor: '#F02A4B',
        width: 220,
        borderRadius: 20,
        padding: 15,
        
    },
    text2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddRoom;
