import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';

import { FloatingAction } from "react-native-floating-action";
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth, } from '../Firebase';

const Rooms = ({navigation, route}) => {
    // ... querying a list of rooms  from firestore
    const [rooms, setRooms] = useState(null);

    const getRooms = async () => {
        const admin = auth?.currentUser?.uid;

        const querySnap = await db.collection('rooms').where('adminUid', '==', admin).get();
        const allRooms = querySnap.docs.map(docSnap => docSnap.data());

        setRooms(allRooms);
    }
    useEffect(() => {
        getRooms();
    })

    // ...
    const [showIndicator, setShowIncator] = useState(false);

    const addRoom = () => {
        setShowIncator(true)
        setTimeout(() => {
            setShowIncator(false)
            //navigation.navigate('AddRoom')
        }, 3000)
        navigation.navigate('AddRoom')
    }
   
    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#F02A4B', justifyContent: 'center', alignItems: 'center', height: '30%', }}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 40}}>Hotel Rooms</Text>
            </View>
            <View style={{padding: 20, backgroundColor: '#FFF', height: '68%', borderRadius: 20}}>
                <View style={{backgroundColor: '#F02A4B', width: 50, height: 50, borderRadius: 50 / 2, bottom: 0, left: '80%'}} >
                    {!showIndicator ? 
                        <TouchableOpacity onPress={addRoom} >
                            <Text style={{color: '#FFF', fontSize: 28, left: 18, top: 7}}>+</Text>
                        </TouchableOpacity>
                    :
                        <ActivityIndicator size='large' color='#F02A4B' />
                    }
                </View>
                <FlatList
                    data={rooms}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return(
                            <SafeAreaView style={{flex: 1}}>
                    

                                <ScrollView>
                                    
                                    <TouchableOpacity>
                                        <View style={styles.tbRoom}>
                                            <Image 
                                                source={{uri: 'https://a.mktgcdn.com/p/1IxJ3Gktr3qc9MM8x9yjuw_W6lo0VM3PNXYwXRSyjIc/2048x1366.jpg'}}
                                                style={{height: 75, width: 100, borderRadius: 10, borderColor: '#FFF'}}
                                            />
                                            <View style={styles.row}>
                                                <Text style={{color: '#000'}}>Hello</Text>
                                                <Text style={{color: '#F02A4B'}}>{item.roomName}</Text>
                                                <Text style={{color: '#F02A4B'}}>{item.roomPrice}</Text>  
                                            </View>
                                        </View>
                                    </TouchableOpacity>    
                                </ScrollView>
                            </SafeAreaView>     
                        ); 
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F02A4B',
    width: '100%',
    height: '100%',
  },
  tbRoom: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F02A4B',
    borderRadius: 10,
    width: '100%',
  },
  row: {
    paddingLeft: 10,
  },
});

export default Rooms;
